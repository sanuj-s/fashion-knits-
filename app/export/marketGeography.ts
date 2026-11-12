export const MARKET_MAP_WIDTH = 1200;
export const MARKET_MAP_HEIGHT = 600;

const EQUAL_EARTH_A1 = 1.340264;
const EQUAL_EARTH_A2 = -0.081106;
const EQUAL_EARTH_A3 = 0.000893;
const EQUAL_EARTH_A4 = 0.003796;
const EQUAL_EARTH_M = Math.sqrt(3) / 2;
const EQUAL_EARTH_SCALE = 216;

export type MapPoint = { x: number; y: number };

export type CountryFeature = {
  type: 'Feature';
  id: string;
  properties: {
    name: string;
    code: string;
    alpha2: string;
    continent: string;
    subregion: string;
    label: [number, number];
  };
  geometry: {
    type: 'MultiPolygon';
    coordinates: [number, number][][][];
  };
};

export function projectCoordinates(latitude: number, longitude: number): MapPoint {
  const phi = Math.max(-89.999, Math.min(89.999, latitude)) * Math.PI / 180;
  const lambda = Math.max(-180, Math.min(180, longitude)) * Math.PI / 180;
  const theta = Math.asin(EQUAL_EARTH_M * Math.sin(phi));
  const theta2 = theta * theta;
  const theta6 = theta2 * theta2 * theta2;
  const denominator = 3 * (
    9 * EQUAL_EARTH_A4 * theta6 * theta2
    + 7 * EQUAL_EARTH_A3 * theta6
    + 3 * EQUAL_EARTH_A2 * theta2
    + EQUAL_EARTH_A1
  );
  const projectedX = (2 * Math.sqrt(3) * lambda * Math.cos(theta)) / denominator;
  const projectedY = theta * (
    EQUAL_EARTH_A4 * theta6 * theta2 * theta2
    + EQUAL_EARTH_A3 * theta6 * theta2
    + EQUAL_EARTH_A2 * theta2
    + EQUAL_EARTH_A1
  );

  return {
    x: MARKET_MAP_WIDTH / 2 + projectedX * EQUAL_EARTH_SCALE,
    y: MARKET_MAP_HEIGHT / 2 - projectedY * EQUAL_EARTH_SCALE,
  };
}

function greatCirclePoints(start: [number, number], end: [number, number], steps: number) {
  const toVector = ([longitude, latitude]: [number, number]): [number, number, number] => {
    const lambda = longitude * Math.PI / 180;
    const phi = latitude * Math.PI / 180;
    return [Math.cos(phi) * Math.cos(lambda), Math.cos(phi) * Math.sin(lambda), Math.sin(phi)];
  };

  const from = toVector(start);
  const to = toVector(end);
  const dot = Math.max(-1, Math.min(1, from[0] * to[0] + from[1] * to[1] + from[2] * to[2]));
  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);

  return Array.from({ length: steps + 1 }, (_, index) => {
    const amount = index / steps;
    const a = sinOmega < 1e-6 ? 1 - amount : Math.sin((1 - amount) * omega) / sinOmega;
    const b = sinOmega < 1e-6 ? amount : Math.sin(amount * omega) / sinOmega;
    const x = from[0] * a + to[0] * b;
    const y = from[1] * a + to[1] * b;
    const z = from[2] * a + to[2] * b;
    return [Math.atan2(y, x) * 180 / Math.PI, Math.atan2(z, Math.hypot(x, y)) * 180 / Math.PI] as [number, number];
  });
}

export function createRoutePaths(start: [number, number], end: [number, number]) {
  const points = greatCirclePoints(start, end, 72).map(([longitude, latitude]) => projectCoordinates(latitude, longitude));
  const segments: MapPoint[][] = [[points[0]]];

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const segment = segments[segments.length - 1];

    if (Math.abs(current.x - previous.x) > MARKET_MAP_WIDTH / 2) {
      const crossesRightEdge = current.x < previous.x;
      const seamY = (previous.y + current.y) / 2;
      segment.push({ x: crossesRightEdge ? MARKET_MAP_WIDTH : 0, y: seamY });
      segments.push([
        { x: crossesRightEdge ? 0 : MARKET_MAP_WIDTH, y: seamY },
        current,
      ]);
      continue;
    }

    segment.push(current);
  }

  return segments
    .filter((segment) => segment.length > 1)
    .map((segment) => segment.map((point, index) => (
      (index === 0 ? 'M ' : 'L ') + point.x.toFixed(2) + ' ' + point.y.toFixed(2)
    )).join(' '));
}

export function createRoutePath(start: [number, number], end: [number, number]) {
  return createRoutePaths(start, end).join(' ');
}

export function regionFromGeography(continent: string, subregion: string) {
  if (continent === 'North America') return 'North America';
  if (continent === 'South America') return 'Latin America';
  if (continent === 'Europe' || continent === 'Africa') return continent;
  if (continent === 'Asia') return /western asia|middle east/i.test(subregion) ? 'Middle East' : 'Asia-Pacific';
  if (continent === 'Oceania') return 'Asia-Pacific';
  return continent || 'International';
}

export function getFeaturePath(feature: CountryFeature) {
  return feature.geometry.coordinates.map((polygon) => polygon.map((ring) => (
    ring.map(([longitude, latitude], index) => {
      const point = projectCoordinates(latitude, longitude);
      return (index === 0 ? 'M ' : 'L ') + point.x.toFixed(2) + ' ' + point.y.toFixed(2);
    }).join(' ') + ' Z'
  )).join(' ')).join(' ');
}
