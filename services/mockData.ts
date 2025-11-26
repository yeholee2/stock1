import { Stock, FitLevel, ChartPoint } from '../types';

const generateHistory = (startPrice: number, days = 120): ChartPoint[] => {
  const points: ChartPoint[] = [];
  let currentPrice = startPrice;
  const today = new Date();

  // Generate data going backwards then reverse
  const rawPoints: ChartPoint[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - (days - 1 - i));
    const dateStr = date.toISOString().split('T')[0];

    // Random daily movement
    const volatility = 0.02; // 2% daily volatility
    const changePercent = (Math.random() - 0.48) * volatility; // Slight upward bias
    
    const open = currentPrice;
    const close = currentPrice * (1 + changePercent);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);

    currentPrice = close;

    // Ensure positive price
    if (currentPrice < 0.1) currentPrice = 0.1;

    // Simple MA calculation placeholder (for visual consistency, not exact math)
    const ma5 = currentPrice * (1 + (Math.random() - 0.5) * 0.02);
    const ma20 = currentPrice * (1 + (Math.random() - 0.5) * 0.05);
    const ma60 = currentPrice * (1 + (Math.random() - 0.5) * 0.1);

    rawPoints.push({
      date: dateStr,
      open,
      high,
      low,
      close,
      ma5,
      ma20,
      ma60
    });
  }

  return rawPoints;
};

export const MOCK_STOCKS: Stock[] = [
  // --- KOREA ---
  {
    id: '1',
    name: 'Samsung Elec',
    ticker: '005930',
    region: 'KR',
    currentPrice: 89200,
    currency: 'KRW',
    changeRate: 3.24,
    fitLevel: FitLevel.HIGH,
    rsScore: 92,
    volumeSpike: 180,
    isAligned: true,
    marketStrength: 22,
    discoveryDate: '2025.11.24',
    discoveryDaysAgo: 5,
    discoveryPrice: 86000,
    industryRs: 'Top 5%',
    marketCapFlow: 25,
    recentVolume: [],
    history: generateHistory(84000)
  },
  {
    id: '2',
    name: 'SK Hynix',
    ticker: '000660',
    region: 'KR',
    currentPrice: 142000,
    currency: 'KRW',
    changeRate: 1.5,
    fitLevel: FitLevel.HIGH,
    rsScore: 95,
    volumeSpike: 210,
    isAligned: true,
    marketStrength: 28,
    discoveryDate: '2025.11.20',
    discoveryDaysAgo: 9,
    discoveryPrice: 130000,
    industryRs: 'Top 2%',
    marketCapFlow: 40,
    recentVolume: [],
    history: generateHistory(128000)
  },
  {
    id: '3',
    name: 'Naver',
    ticker: '035420',
    region: 'KR',
    currentPrice: 210500,
    currency: 'KRW',
    changeRate: 0.8,
    fitLevel: FitLevel.MID,
    rsScore: 82,
    volumeSpike: 140,
    isAligned: true,
    marketStrength: 15,
    discoveryDate: '2025.11.28',
    discoveryDaysAgo: 1,
    discoveryPrice: 208000,
    industryRs: 'Top 15%',
    marketCapFlow: 10,
    recentVolume: [],
    history: generateHistory(205000)
  },
  {
    id: '4',
    name: 'Kakao',
    ticker: '035720',
    region: 'KR',
    currentPrice: 54000,
    currency: 'KRW',
    changeRate: -0.5,
    fitLevel: FitLevel.LOW,
    rsScore: 74,
    volumeSpike: 110,
    isAligned: false,
    marketStrength: 5,
    discoveryDate: '2025.11.25',
    discoveryDaysAgo: 4,
    discoveryPrice: 53500,
    industryRs: 'Top 30%',
    marketCapFlow: 5,
    recentVolume: [],
    history: generateHistory(55000)
  },
  
  // --- USA ---
  {
    id: '101',
    name: 'Tesla',
    ticker: 'TSLA',
    region: 'US',
    currentPrice: 345.20,
    currency: 'USD',
    changeRate: 4.50,
    fitLevel: FitLevel.HIGH,
    rsScore: 97,
    volumeSpike: 220,
    isAligned: true,
    marketStrength: 35,
    discoveryDate: '2025.11.22',
    discoveryDaysAgo: 7,
    discoveryPrice: 310.00,
    industryRs: 'Top 1%',
    marketCapFlow: 120,
    recentVolume: [],
    history: generateHistory(290)
  },
  {
    id: '102',
    name: 'NVIDIA',
    ticker: 'NVDA',
    region: 'US',
    currentPrice: 142.50,
    currency: 'USD',
    changeRate: 2.10,
    fitLevel: FitLevel.HIGH,
    rsScore: 99,
    volumeSpike: 150,
    isAligned: true,
    marketStrength: 40,
    discoveryDate: '2025.11.15',
    discoveryDaysAgo: 14,
    discoveryPrice: 125.00,
    industryRs: 'Top 1%',
    marketCapFlow: 90,
    recentVolume: [],
    history: generateHistory(120)
  },
  {
    id: '103',
    name: 'Palantir',
    ticker: 'PLTR',
    region: 'US',
    currentPrice: 62.40,
    currency: 'USD',
    changeRate: 8.40,
    fitLevel: FitLevel.HIGH,
    rsScore: 96,
    volumeSpike: 300,
    isAligned: true,
    marketStrength: 28,
    discoveryDate: '2025.11.27',
    discoveryDaysAgo: 2,
    discoveryPrice: 54.00,
    industryRs: 'Top 5%',
    marketCapFlow: 60,
    recentVolume: [],
    history: generateHistory(45)
  },
  {
    id: '104',
    name: 'IonQ',
    ticker: 'IONQ',
    region: 'US',
    currentPrice: 28.50,
    currency: 'USD',
    changeRate: -1.2,
    fitLevel: FitLevel.MID,
    rsScore: 88,
    volumeSpike: 140,
    isAligned: true,
    marketStrength: 15,
    discoveryDate: '2025.11.26',
    discoveryDaysAgo: 3,
    discoveryPrice: 27.80,
    industryRs: 'Top 10%',
    marketCapFlow: 20,
    recentVolume: [],
    history: generateHistory(25)
  },
  {
    id: '105',
    name: 'Apple',
    ticker: 'AAPL',
    region: 'US',
    currentPrice: 235.00,
    currency: 'USD',
    changeRate: 0.5,
    fitLevel: FitLevel.LOW,
    rsScore: 78,
    volumeSpike: 90,
    isAligned: false,
    marketStrength: 10,
    discoveryDate: '2025.11.20',
    discoveryDaysAgo: 9,
    discoveryPrice: 232.00,
    industryRs: 'Top 15%',
    marketCapFlow: 5,
    recentVolume: [],
    history: generateHistory(225)
  }
];