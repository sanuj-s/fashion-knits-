type CountryGateway = {
  sea: string | null;
  air: string | null;
};

export type LogisticsProfile = CountryGateway & {
  seaTransitDays: null;
  airTransitDays: null;
  liveTrackingAvailable: false;
  isOrigin?: boolean;
};

export const SHIPMENT_STAGES = [
  { id: 'manufacturing', number: '01', label: 'Manufacturing' },
  { id: 'export-gateway', number: '02', label: 'Export gateway' },
  { id: 'export-customs', number: '03', label: 'Export customs' },
  { id: 'international-transport', number: '04', label: 'International transport' },
  { id: 'destination-gateway', number: '05', label: 'Destination gateway' },
  { id: 'import-customs', number: '06', label: 'Import customs' },
  { id: 'final-delivery', number: '07', label: 'Final delivery' },
] as const;

export type ShipmentStageId = (typeof SHIPMENT_STAGES)[number]['id'];

export const EXPORT_DOCUMENTS = [
  { title: 'Commercial invoice', detail: 'Summarizes the sale, goods, parties and declared value for customs and payment records.' },
  { title: 'Packing list', detail: 'Shows carton contents, quantities, weights and package dimensions for handling and inspection.' },
  { title: 'Shipping bill', detail: 'India’s export declaration filed for customs clearance; the exact filing depends on the shipment.' },
  { title: 'Bill of lading / air waybill', detail: 'The carrier’s transport record for sea or air cargo and the shipment reference used during transit.' },
  { title: 'Certificates & destination documents', detail: 'Any origin, product or customs certificates depend on the goods and destination. Confirm the required set with the buyer and customs broker.' },
] as const;

export const MANUFACTURING_STAGES = [
  { title: 'Pattern & cutting', detail: 'In-house CAD pattern support and automatic cutting.' },
  { title: 'Print & embroider', detail: 'Printing and embroidery processes for buyer-approved designs.' },
  { title: 'Sew & finish', detail: 'Garment sewing, trimming, checking and ironing.' },
  { title: 'Quality & pack', detail: 'Fabric inspection, in-house tests, final garment checks, metal detection where required, and export-carton packing.' },
] as const;

/**
 * Planning gateways for the markets currently listed in GlobalMarketsData.
 * These are examples for route exploration, not Fashion Knits booking records.
 */
const COUNTRY_GATEWAYS: Record<string, CountryGateway> = {
  GB: { sea: 'Felixstowe Port', air: 'London Heathrow (LHR)' },
  FR: { sea: 'Le Havre Port', air: 'Paris Charles de Gaulle (CDG)' },
  DE: { sea: 'Hamburg Port', air: 'Frankfurt Airport (FRA)' },
  IT: { sea: 'Genoa Port', air: 'Milan Malpensa (MXP)' },
  ES: { sea: 'Valencia Port', air: 'Madrid Barajas (MAD)' },
  NL: { sea: 'Rotterdam Port', air: 'Amsterdam Schiphol (AMS)' },
  BE: { sea: 'Port of Antwerp-Bruges', air: 'Brussels Airport (BRU)' },
  CH: { sea: 'Rotterdam, then road to Basel', air: 'Zurich Airport (ZRH)' },
  AT: { sea: 'Koper, then road to Vienna', air: 'Vienna Airport (VIE)' },
  IE: { sea: 'Dublin Port', air: 'Dublin Airport (DUB)' },
  SE: { sea: 'Gothenburg Port', air: 'Stockholm Arlanda (ARN)' },
  DK: { sea: 'Aarhus Port', air: 'Copenhagen Airport (CPH)' },
  NO: { sea: 'Oslo Port', air: 'Oslo Airport (OSL)' },
  FI: { sea: 'Helsinki Port', air: 'Helsinki Airport (HEL)' },
  PT: { sea: 'Lisbon Port', air: 'Lisbon Airport (LIS)' },
  PL: { sea: 'Gdansk Port', air: 'Warsaw Chopin (WAW)' },
  GR: { sea: 'Piraeus Port', air: 'Athens Airport (ATH)' },
  LU: { sea: 'Antwerp, then road to Luxembourg', air: 'Luxembourg Airport (LUX)' },
  CZ: { sea: 'Hamburg, then road to Prague', air: 'Prague Airport (PRG)' },
  IS: { sea: 'Reykjavik Port', air: 'Keflavik Airport (KEF)' },
  SK: { sea: 'Koper, then road to Bratislava', air: 'Bratislava Airport (BTS)' },
  SI: { sea: 'Port of Koper', air: 'Ljubljana Airport (LJU)' },
  HU: { sea: 'Koper, then road to Budapest', air: 'Budapest Airport (BUD)' },
  RO: { sea: 'Constanta Port', air: 'Bucharest Henri Coanda (OTP)' },
  BG: { sea: 'Varna Port', air: 'Sofia Airport (SOF)' },
  HR: { sea: 'Rijeka Port', air: 'Zagreb Airport (ZAG)' },
  EE: { sea: 'Port of Tallinn', air: 'Tallinn Airport (TLL)' },
  LV: { sea: 'Riga Port', air: 'Riga Airport (RIX)' },
  LT: { sea: 'Klaipeda Port', air: 'Vilnius Airport (VNO)' },
  CY: { sea: 'Limassol Port', air: 'Larnaca Airport (LCA)' },
  MT: { sea: 'Marsaxlokk Freeport', air: 'Malta International (MLA)' },

  US: { sea: 'Port of New York and New Jersey', air: 'John F. Kennedy (JFK)' },
  CA: { sea: 'Port of Montreal', air: 'Toronto Pearson (YYZ)' },
  MX: { sea: 'Manzanillo Port', air: 'Mexico City International (MEX)' },
  CR: { sea: 'Puerto Limon', air: 'Juan Santamaria International (SJO)' },
  PA: { sea: 'Balboa Port', air: 'Tocumen International (PTY)' },
  BR: { sea: 'Santos Port', air: 'Sao Paulo Guarulhos (GRU)' },
  CL: { sea: 'San Antonio Port', air: 'Santiago International (SCL)' },
  AR: { sea: 'Buenos Aires Port', air: 'Ezeiza International (EZE)' },
  CO: { sea: 'Cartagena Port', air: 'El Dorado International (BOG)' },
  PE: { sea: 'Callao Port', air: 'Jorge Chavez International (LIM)' },
  UY: { sea: 'Montevideo Port', air: 'Carrasco International (MVD)' },

  JP: { sea: 'Yokohama Port', air: 'Narita International (NRT)' },
  KR: { sea: 'Busan Port', air: 'Incheon International (ICN)' },
  SG: { sea: 'Port of Singapore', air: 'Changi Airport (SIN)' },
  AU: { sea: 'Port Botany, Sydney', air: 'Sydney Airport (SYD)' },
  NZ: { sea: 'Port of Auckland', air: 'Auckland Airport (AKL)' },
  HK: { sea: 'Kwai Tsing Container Terminals', air: 'Hong Kong International (HKG)' },
  TW: { sea: 'Kaohsiung Port', air: 'Taoyuan International (TPE)' },
  CN: { sea: 'Port of Shanghai', air: 'Shanghai Pudong (PVG)' },
  MY: { sea: 'Port Klang', air: 'Kuala Lumpur International (KUL)' },
  TH: { sea: 'Laem Chabang Port', air: 'Suvarnabhumi Airport (BKK)' },
  VN: { sea: 'Cat Lai Terminal, Ho Chi Minh City', air: 'Tan Son Nhat (SGN)' },
  ID: { sea: 'Tanjung Priok Port, Jakarta', air: 'Soekarno-Hatta (CGK)' },
  PH: { sea: 'Port of Manila', air: 'Ninoy Aquino International (MNL)' },
  IN: { sea: 'Chennai / V.O. Chidambaranar Port', air: 'Coimbatore / Chennai cargo' },
  BD: { sea: 'Chattogram Port', air: 'Hazrat Shahjalal International (DAC)' },
  LK: { sea: 'Port of Colombo', air: 'Bandaranaike International (CMB)' },

  QA: { sea: 'Hamad Port', air: 'Hamad International (DOH)' },
  AE: { sea: 'Jebel Ali Port', air: 'Dubai International (DXB)' },
  SA: { sea: 'Jeddah Islamic Port', air: 'King Khalid International (RUH)' },
  KW: { sea: 'Shuwaikh Port', air: 'Kuwait International (KWI)' },
  OM: { sea: 'Sohar Port', air: 'Muscat International (MCT)' },
  BH: { sea: 'Khalifa Bin Salman Port', air: 'Bahrain International (BAH)' },
  IL: { sea: 'Port of Haifa', air: 'Ben Gurion Airport (TLV)' },
  TR: { sea: 'Ambarli Port, Istanbul', air: 'Istanbul Airport (IST)' },
  JO: { sea: 'Aqaba Port', air: 'Queen Alia International (AMM)' },

  ZA: { sea: 'Port of Durban', air: 'O. R. Tambo International (JNB)' },
  EG: { sea: 'Alexandria Port', air: 'Cairo International (CAI)' },
  KE: { sea: 'Port of Mombasa', air: 'Jomo Kenyatta International (NBO)' },
  MA: { sea: 'Tanger Med Port', air: 'Mohammed V International (CMN)' },
  NG: { sea: 'Apapa Port, Lagos', air: 'Murtala Muhammed International (LOS)' },
  GH: { sea: 'Tema Port', air: 'Kotoka International (ACC)' },
  MU: { sea: 'Port Louis Harbour', air: 'Sir Seewoosagur Ramgoolam (MRU)' },
};

export const ORIGIN_GATEWAYS = {
  sea: 'V.O. Chidambaranar Port (Tuticorin) or Chennai Port',
  air: 'Coimbatore cargo complex or Chennai Airport cargo',
} as const;

export const ORIGIN_GATEWAY_POINTS = {
  sea: { lat: 8.75, lon: 78.13 },
  air: { lat: 11.03, lon: 77.04 },
} as const;

export function getLogisticsProfile(code: string): LogisticsProfile | null {
  if (code === 'IN') {
    return {
      sea: null,
      air: null,
      seaTransitDays: null,
      airTransitDays: null,
      liveTrackingAvailable: false,
      isOrigin: true,
    };
  }

  const gateways = COUNTRY_GATEWAYS[code];
  if (!gateways) return null;
  return {
    ...gateways,
    seaTransitDays: null,
    airTransitDays: null,
    liveTrackingAvailable: false,
  };
}
