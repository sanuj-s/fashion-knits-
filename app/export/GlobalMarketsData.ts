export const REGIONS = [
  'Europe',
  'North America',
  'Latin America',
  'Asia-Pacific',
  'Middle East',
  'Africa',
] as const;

export type MarketRegion = (typeof REGIONS)[number];

export const CONTINENTS = [
  'Europe',
  'Asia',
  'North America',
  'South America',
  'Africa',
  'Oceania',
] as const;

export type Continent = (typeof CONTINENTS)[number];

export type Market = {
  code: string;
  name: string;
  region: MarketRegion;
  lat: number;
  lon: number;
};

// Representative capital-city coordinates for illustrative market geography.
export const MARKETS: Market[] = [
  { name: 'United Kingdom', code: 'GB', region: 'Europe', lat: 51.507, lon: -0.128 },
  { name: 'France', code: 'FR', region: 'Europe', lat: 48.857, lon: 2.352 },
  { name: 'Germany', code: 'DE', region: 'Europe', lat: 52.52, lon: 13.405 },
  { name: 'Italy', code: 'IT', region: 'Europe', lat: 41.902, lon: 12.496 },
  { name: 'Spain', code: 'ES', region: 'Europe', lat: 40.416, lon: -3.704 },
  { name: 'Netherlands', code: 'NL', region: 'Europe', lat: 52.37, lon: 4.895 },
  { name: 'Belgium', code: 'BE', region: 'Europe', lat: 50.85, lon: 4.35 },
  { name: 'Switzerland', code: 'CH', region: 'Europe', lat: 46.948, lon: 7.447 },
  { name: 'Austria', code: 'AT', region: 'Europe', lat: 48.208, lon: 16.373 },
  { name: 'Ireland', code: 'IE', region: 'Europe', lat: 53.35, lon: -6.26 },
  { name: 'Sweden', code: 'SE', region: 'Europe', lat: 59.329, lon: 18.069 },
  { name: 'Denmark', code: 'DK', region: 'Europe', lat: 55.676, lon: 12.568 },
  { name: 'Norway', code: 'NO', region: 'Europe', lat: 59.913, lon: 10.752 },
  { name: 'Finland', code: 'FI', region: 'Europe', lat: 60.169, lon: 24.938 },
  { name: 'Portugal', code: 'PT', region: 'Europe', lat: 38.722, lon: -9.139 },
  { name: 'Poland', code: 'PL', region: 'Europe', lat: 52.229, lon: 21.012 },
  { name: 'Greece', code: 'GR', region: 'Europe', lat: 37.984, lon: 23.728 },
  { name: 'Luxembourg', code: 'LU', region: 'Europe', lat: 49.611, lon: 6.132 },
  { name: 'Czechia', code: 'CZ', region: 'Europe', lat: 50.075, lon: 14.438 },
  { name: 'Iceland', code: 'IS', region: 'Europe', lat: 64.146, lon: -21.94 },
  { name: 'Slovakia', code: 'SK', region: 'Europe', lat: 48.148, lon: 17.107 },
  { name: 'Slovenia', code: 'SI', region: 'Europe', lat: 46.056, lon: 14.505 },
  { name: 'Hungary', code: 'HU', region: 'Europe', lat: 47.498, lon: 19.04 },
  { name: 'Romania', code: 'RO', region: 'Europe', lat: 44.426, lon: 26.102 },
  { name: 'Bulgaria', code: 'BG', region: 'Europe', lat: 42.697, lon: 23.322 },
  { name: 'Croatia', code: 'HR', region: 'Europe', lat: 45.815, lon: 15.982 },
  { name: 'Estonia', code: 'EE', region: 'Europe', lat: 59.437, lon: 24.753 },
  { name: 'Latvia', code: 'LV', region: 'Europe', lat: 56.949, lon: 24.105 },
  { name: 'Lithuania', code: 'LT', region: 'Europe', lat: 54.687, lon: 25.279 },
  { name: 'Cyprus', code: 'CY', region: 'Europe', lat: 35.185, lon: 33.382 },
  { name: 'Malta', code: 'MT', region: 'Europe', lat: 35.899, lon: 14.514 },

  { name: 'United States', code: 'US', region: 'North America', lat: 38.907, lon: -77.037 },
  { name: 'Canada', code: 'CA', region: 'North America', lat: 45.421, lon: -75.697 },

  { name: 'Brazil', code: 'BR', region: 'Latin America', lat: -15.793, lon: -47.882 },
  { name: 'Mexico', code: 'MX', region: 'Latin America', lat: 19.433, lon: -99.133 },
  { name: 'Chile', code: 'CL', region: 'Latin America', lat: -33.448, lon: -70.669 },
  { name: 'Argentina', code: 'AR', region: 'Latin America', lat: -34.604, lon: -58.382 },
  { name: 'Colombia', code: 'CO', region: 'Latin America', lat: 4.711, lon: -74.072 },
  { name: 'Peru', code: 'PE', region: 'Latin America', lat: -12.046, lon: -77.043 },
  { name: 'Uruguay', code: 'UY', region: 'Latin America', lat: -34.901, lon: -56.164 },
  { name: 'Costa Rica', code: 'CR', region: 'Latin America', lat: 9.928, lon: -84.091 },
  { name: 'Panama', code: 'PA', region: 'Latin America', lat: 8.983, lon: -79.519 },

  { name: 'Japan', code: 'JP', region: 'Asia-Pacific', lat: 35.676, lon: 139.65 },
  { name: 'South Korea', code: 'KR', region: 'Asia-Pacific', lat: 37.566, lon: 126.978 },
  { name: 'Singapore', code: 'SG', region: 'Asia-Pacific', lat: 1.352, lon: 103.82 },
  { name: 'Australia', code: 'AU', region: 'Asia-Pacific', lat: -35.28, lon: 149.13 },
  { name: 'New Zealand', code: 'NZ', region: 'Asia-Pacific', lat: -41.286, lon: 174.776 },
  { name: 'Hong Kong', code: 'HK', region: 'Asia-Pacific', lat: 22.319, lon: 114.169 },
  { name: 'Taiwan', code: 'TW', region: 'Asia-Pacific', lat: 25.033, lon: 121.565 },
  { name: 'China', code: 'CN', region: 'Asia-Pacific', lat: 39.904, lon: 116.407 },
  { name: 'Malaysia', code: 'MY', region: 'Asia-Pacific', lat: 3.139, lon: 101.687 },
  { name: 'Thailand', code: 'TH', region: 'Asia-Pacific', lat: 13.756, lon: 100.502 },
  { name: 'Vietnam', code: 'VN', region: 'Asia-Pacific', lat: 21.028, lon: 105.834 },
  { name: 'Indonesia', code: 'ID', region: 'Asia-Pacific', lat: -6.208, lon: 106.845 },
  { name: 'Philippines', code: 'PH', region: 'Asia-Pacific', lat: 14.6, lon: 120.984 },
  { name: 'India', code: 'IN', region: 'Asia-Pacific', lat: 28.614, lon: 77.209 },
  { name: 'Bangladesh', code: 'BD', region: 'Asia-Pacific', lat: 23.81, lon: 90.412 },
  { name: 'Sri Lanka', code: 'LK', region: 'Asia-Pacific', lat: 6.927, lon: 79.862 },

  { name: 'Qatar', code: 'QA', region: 'Middle East', lat: 25.285, lon: 51.531 },
  { name: 'United Arab Emirates', code: 'AE', region: 'Middle East', lat: 24.453, lon: 54.377 },
  { name: 'Saudi Arabia', code: 'SA', region: 'Middle East', lat: 24.714, lon: 46.675 },
  { name: 'Kuwait', code: 'KW', region: 'Middle East', lat: 29.375, lon: 47.977 },
  { name: 'Oman', code: 'OM', region: 'Middle East', lat: 23.588, lon: 58.383 },
  { name: 'Bahrain', code: 'BH', region: 'Middle East', lat: 26.223, lon: 50.587 },
  { name: 'Israel', code: 'IL', region: 'Middle East', lat: 31.769, lon: 35.216 },
  { name: 'Turkey', code: 'TR', region: 'Middle East', lat: 39.933, lon: 32.86 },
  { name: 'Jordan', code: 'JO', region: 'Middle East', lat: 31.953, lon: 35.91 },

  { name: 'South Africa', code: 'ZA', region: 'Africa', lat: -25.747, lon: 28.229 },
  { name: 'Egypt', code: 'EG', region: 'Africa', lat: 30.044, lon: 31.236 },
  { name: 'Kenya', code: 'KE', region: 'Africa', lat: -1.292, lon: 36.822 },
  { name: 'Morocco', code: 'MA', region: 'Africa', lat: 34.021, lon: -6.842 },
  { name: 'Nigeria', code: 'NG', region: 'Africa', lat: 9.076, lon: 7.398 },
  { name: 'Ghana', code: 'GH', region: 'Africa', lat: 5.604, lon: -0.187 },
  { name: 'Mauritius', code: 'MU', region: 'Africa', lat: -20.16, lon: 57.502 },
];

export const FEATURED_MARKET_CODES = ['FR', 'GB', 'DE', 'US', 'CA', 'CH', 'AU', 'JP', 'SG', 'QA', 'AE'] as const;

export function getMarketContinent(market: Pick<Market, 'code' | 'region'>): Continent {
  if (market.region === 'Europe') return 'Europe';
  if (market.region === 'North America') return 'North America';
  if (market.region === 'Latin America') {
    return ['BR', 'CL', 'AR', 'CO', 'PE', 'UY'].includes(market.code) ? 'South America' : 'North America';
  }
  if (market.region === 'Asia-Pacific') return ['AU', 'NZ'].includes(market.code) ? 'Oceania' : 'Asia';
  if (market.region === 'Middle East') return 'Asia';
  if (market.region === 'Africa') return 'Africa';
  return 'Europe';
}

export const CONTINENT_CENTERS: Record<Continent, { lat: number; lon: number }> = {
  Europe: { lat: 51, lon: 12 },
  Asia: { lat: 28, lon: 91 },
  'North America': { lat: 40, lon: -101 },
  'South America': { lat: -18, lon: -61 },
  Africa: { lat: 1, lon: 20 },
  Oceania: { lat: -23, lon: 139 },
};

export const REGION_CENTERS: Record<MarketRegion, { lat: number; lon: number }> = {
  Europe: { lat: 51, lon: 12 },
  'North America': { lat: 40, lon: -101 },
  'Latin America': { lat: -18, lon: -65 },
  'Asia-Pacific': { lat: 27, lon: 131 },
  'Middle East': { lat: 24, lon: 48 },
  Africa: { lat: 1, lon: 20 },
};

export const TIRUPPUR = { lat: 11.1, lon: 77.3 };
