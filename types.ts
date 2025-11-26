export enum FitLevel {
  HIGH = 'HIGH',
  MID = 'MID',
  LOW = 'LOW'
}

export type Region = 'KR' | 'US';

export interface ChartPoint {
  date: string; // ISO format YYYY-MM-DD
  open: number;
  high: number;
  low: number;
  close: number;
  ma5: number;
  ma20: number;
  ma60: number;
}

export interface Stock {
  id: string;
  name: string;
  ticker: string;
  region: Region;
  currentPrice: number;
  currency: string; // 'KRW' or 'USD'
  changeRate: number; // Percentage, e.g., 3.24
  fitLevel: FitLevel;
  
  // Tags
  rsScore: number;
  volumeSpike: number; // Percentage, e.g., 180
  isAligned: boolean; // Moving average alignment
  marketStrength: number; // Percentage
  
  // Discovery Info
  discoveryDate: string;
  discoveryDaysAgo: number;
  discoveryPrice: number;
  
  // Detail Specifics
  industryRs: string; // "Top 20%"
  marketCapFlow: number; // Percentage increase in traded value
  recentVolume: { date: string; volume: number; isUp: boolean }[];
  
  // Chart Data
  history: ChartPoint[];
}

export type SortOption = 'GAIN_DESC' | 'RS_DESC' | 'DATE_DESC' | 'VOLUME_DESC';