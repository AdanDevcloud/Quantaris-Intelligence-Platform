export interface QuantCoin {
  id: string;
  name: string;
  symbol: string;
  priceUsd: number;
  marketCap: number;
  volume24h: number;
  percentChange24h: number; // For risk filter (>15% penalty, sudden spikes)
  
  // EMA Indicators
  aboveEma20: boolean;
  aboveEma50: boolean;
  ema20AboveEma50: boolean;
  ema20Value: number;
  ema50Value: number;

  // RSI Indicators
  rsiValue: number;
  rsiDivergenceType: 'Regular Bullish' | 'Hidden Bullish' | 'Regular Bearish' | 'Hidden Bearish' | 'None';
  rsiDivergenceReason: string;

  // Volume Confirmation
  volume24hAvg20d: number; // To check if Volume24h > AvgVolume20d
  volumeConfirmation: 'Expanded' | 'Normal' | 'Contracted';

  // ADX Trend Strength
  adxValue: number; // ADX(14)

  // Risk factors
  pumpDumpSuspected: boolean;
  candleLimitPenalized: boolean; // 24h change magnitude > 15%
}

export interface ScoredCoin extends QuantCoin {
  volumeMcRatio: number; // (Volume / MC) * 100
  
  // Score breakdowns
  volumeMcScore: number;       // Max 25
  emaStructureScore: number;    // Max 20
  rsiDivergenceScore: number;   // Max 20
  volumeConfirmationScore: number; // Max 15
  adxScore: number;            // Max 10
  liquidityScore: number;      // Max 10
  riskPenalty: number;         // Negative offset

  finalScore: number;          // 0 - 100
  probabilityRating: 'A+' | 'A' | 'B' | 'C';
}

// Complete predefined assets with high-fidelity analytical state
export const ANALYST_COINS: QuantCoin[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    priceUsd: 67250,
    marketCap: 1320000000000,
    volume24h: 38240000000,
    percentChange24h: -1.25,
    aboveEma20: true,
    aboveEma50: true,
    ema20AboveEma50: true,
    ema20Value: 66410,
    ema50Value: 64800,
    rsiValue: 58,
    rsiDivergenceType: 'Hidden Bullish',
    rsiDivergenceReason: 'Price makes higher low while RSI prints pivot-confirmed lower low at oversold margin.',
    volume24hAvg20d: 32000000000,
    volumeConfirmation: 'Expanded',
    adxValue: 28,
    pumpDumpSuspected: false,
    candleLimitPenalized: false,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    priceUsd: 3512,
    marketCap: 421000000000,
    volume24h: 18450000000,
    percentChange24h: 2.15,
    aboveEma20: true,
    aboveEma50: true,
    ema20AboveEma50: true,
    ema20Value: 3410,
    ema50Value: 3280,
    rsiValue: 62,
    rsiDivergenceType: 'Regular Bullish',
    rsiDivergenceReason: 'Price made swing-low breakdown with immediate return, RSI diverged with confirmed higher swing low.',
    volume24hAvg20d: 14200000000,
    volumeConfirmation: 'Expanded',
    adxValue: 36,
    pumpDumpSuspected: false,
    candleLimitPenalized: false,
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    priceUsd: 148.50,
    marketCap: 68400000000,
    volume24h: 3950000000,
    percentChange24h: -4.80,
    aboveEma20: false,
    aboveEma50: true,
    ema20AboveEma50: true,
    ema20Value: 154.20,
    ema50Value: 141.60,
    rsiValue: 46,
    rsiDivergenceType: 'None',
    rsiDivergenceReason: 'Neutral momentum oscillator with no pivot divergences.',
    volume24hAvg20d: 3800000000,
    volumeConfirmation: 'Normal',
    adxValue: 24,
    pumpDumpSuspected: false,
    candleLimitPenalized: false,
  },
  {
    id: 'bnb',
    name: 'BNB',
    symbol: 'BNB',
    priceUsd: 605.10,
    marketCap: 89000000000,
    volume24h: 1850000000,
    percentChange24h: 0.12,
    aboveEma20: true,
    aboveEma50: true,
    ema20AboveEma50: true,
    ema20Value: 590.50,
    ema50Value: 572.10,
    rsiValue: 54,
    rsiDivergenceType: 'Regular Bullish',
    rsiDivergenceReason: 'RSI bottomed at 32 during recent low, price made minor new low but RSI printed clean higher low.',
    volume24hAvg20d: 1100000000,
    volumeConfirmation: 'Expanded',
    adxValue: 27,
    pumpDumpSuspected: false,
    candleLimitPenalized: false,
  },
  {
    id: 'wif',
    name: 'dogwifhat',
    symbol: 'WIF',
    priceUsd: 2.05,
    marketCap: 2050000000,
    volume24h: 295000000,
    percentChange24h: -11.23,
    aboveEma20: false,
    aboveEma50: false,
    ema20AboveEma50: false,
    ema20Value: 2.38,
    ema50Value: 2.65,
    rsiValue: 34,
    rsiDivergenceType: 'Regular Bullish',
    rsiDivergenceReason: 'Double-bottom swing on 4H chart with high divergence index on the RSI(14).',
    volume24hAvg20d: 280000000,
    volumeConfirmation: 'Normal',
    adxValue: 33,
    pumpDumpSuspected: false,
    candleLimitPenalized: false,
  },
  {
    id: 'pepe',
    name: 'Pepe',
    symbol: 'PEPE',
    priceUsd: 0.00001140,
    marketCap: 4800000000,
    volume24h: 820000000,
    percentChange24h: -14.85,
    aboveEma20: false,
    aboveEma50: true,
    ema20AboveEma50: true,
    ema20Value: 0.00001250,
    ema50Value: 0.00001090,
    rsiValue: 41,
    rsiDivergenceType: 'None',
    rsiDivergenceReason: 'Bearish continuation pattern without divergence setups.',
    volume24hAvg20d: 780000000,
    volumeConfirmation: 'Normal',
    adxValue: 22,
    pumpDumpSuspected: false,
    candleLimitPenalized: false,
  },
  {
    id: 'link',
    name: 'Chainlink',
    symbol: 'LINK',
    priceUsd: 16.42,
    marketCap: 9600000000,
    volume24h: 980000000,
    percentChange24h: 6.80,
    aboveEma20: true,
    aboveEma50: true,
    ema20AboveEma50: true,
    ema20Value: 15.10,
    ema50Value: 14.25,
    rsiValue: 68,
    rsiDivergenceType: 'Regular Bullish',
    rsiDivergenceReason: 'Clean bottom divergence pattern with 5-left and 5-right confirmation candle periods.',
    volume24hAvg20d: 450000000,
    volumeConfirmation: 'Expanded',
    adxValue: 42,
    pumpDumpSuspected: false,
    candleLimitPenalized: false,
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    priceUsd: 0.385,
    marketCap: 13700000000,
    volume24h: 480000000,
    percentChange24h: -3.42,
    aboveEma20: false,
    aboveEma50: false,
    ema20AboveEma50: false,
    ema20Value: 0.412,
    ema50Value: 0.445,
    rsiValue: 31,
    rsiDivergenceType: 'None',
    rsiDivergenceReason: 'Oversold ranges without structural pivots confirmed.',
    volume24hAvg20d: 420000000,
    volumeConfirmation: 'Normal',
    adxValue: 19,
    pumpDumpSuspected: false,
    candleLimitPenalized: false,
  },
  {
    id: 'near',
    name: 'Near Protocol',
    symbol: 'NEAR',
    priceUsd: 6.12,
    marketCap: 6400000000,
    volume24h: 810000000,
    percentChange24h: 5.75,
    aboveEma20: true,
    aboveEma50: true,
    ema20AboveEma50: true,
    ema20Value: 5.62,
    ema50Value: 5.15,
    rsiValue: 64,
    rsiDivergenceType: 'Regular Bullish',
    rsiDivergenceReason: 'Pivot swing-low confirmed on daily; higher dynamic RSI low relative to price double bottom.',
    volume24hAvg20d: 520000500,
    volumeConfirmation: 'Expanded',
    adxValue: 38,
    pumpDumpSuspected: false,
    candleLimitPenalized: false,
  },
  {
    id: 'rndr',
    name: 'Render Token',
    symbol: 'RNDR',
    priceUsd: 8.45,
    marketCap: 3260000000,
    volume24h: 640000000,
    percentChange24h: 16.50, // large candle > 15%
    aboveEma20: true,
    aboveEma50: true,
    ema20AboveEma50: true,
    ema20Value: 7.20,
    ema50Value: 6.80,
    rsiValue: 72,
    rsiDivergenceType: 'Hidden Bullish',
    rsiDivergenceReason: 'Hidden bullish expansion on weekly, though 24h short-term action is highly overextended.',
    volume24hAvg20d: 380000000,
    volumeConfirmation: 'Expanded',
    adxValue: 41,
    pumpDumpSuspected: false,
    candleLimitPenalized: true, // will be penalized
  },
  {
    id: 'microshit',
    name: 'MicroCap Shitcoin',
    symbol: 'MCS',
    priceUsd: 0.12,
    marketCap: 12000000, // below $50M limit
    volume24h: 4200000, // below $5M limit
    percentChange24h: 24.50,
    aboveEma20: true,
    aboveEma50: true,
    ema20AboveEma50: true,
    ema20Value: 0.08,
    ema50Value: 0.06,
    rsiValue: 82,
    rsiDivergenceType: 'Regular Bearish',
    rsiDivergenceReason: 'Heavy regular bearish divergence detected alongside massive extreme market over-exhaustion.',
    volume24hAvg20d: 120000,
    volumeConfirmation: 'Expanded',
    adxValue: 52,
    pumpDumpSuspected: true, // pump & dump warning
    candleLimitPenalized: true,
  }
];

export function calculateQuantScore(coin: QuantCoin): ScoredCoin {
  const volumeMcPercent = coin.marketCap > 0 ? (coin.volume24h / coin.marketCap) * 100 : 0;
  
  // 1. Volume / Market Cap Ratio (Weight: 25%)
  // Max score of 25 is given when V/MC >= 15%. Linear below that.
  let volumeMcScore = 0;
  if (volumeMcPercent >= 15) {
    volumeMcScore = 25;
  } else {
    volumeMcScore = (volumeMcPercent / 15) * 25;
  }
  volumeMcScore = Math.min(25, Math.max(0, volumeMcScore));

  // 2. Trend Filter (Weight: 20%)
  // - aboveEma20: 5 pts
  // - aboveEma50: 5 pts
  // - ema20AboveEma50: 10 pts
  let emaStructureScore = 0;
  if (coin.aboveEma20) emaStructureScore += 5;
  if (coin.aboveEma50) emaStructureScore += 5;
  if (coin.ema20AboveEma50) emaStructureScore += 10;

  // 3. RSI Divergence (Weight: 20%)
  // Pivot-confirmed regular bullish or hidden bullish get maximum score.
  // Bearish divergences get 0 points here. Neutral/None gets moderate points.
  let rsiDivergenceScore = 0;
  if (coin.rsiDivergenceType === 'Regular Bullish') {
    rsiDivergenceScore = 20;
  } else if (coin.rsiDivergenceType === 'Hidden Bullish') {
    rsiDivergenceScore = 17;
  } else if (coin.rsiDivergenceType === 'None') {
    rsiDivergenceScore = 6; // base neutral strength
  } else {
    // Bearish divergences
    rsiDivergenceScore = 2; 
  }

  // 4. Volume Confirmation (Weight: 15%)
  // Current volume must be greater than 20-period average volume
  let volumeConfirmationScore = 0;
  if (coin.volume24h > coin.volume24hAvg20d) {
    volumeConfirmationScore = 15;
  } else if (coin.volumeConfirmation === 'Normal') {
    volumeConfirmationScore = 8;
  } else {
    volumeConfirmationScore = 2;
  }

  // 5. ADX Trend Strength Strength (Weight: 10%)
  // ADX > 25 = Strong Trend (+7)
  // ADX > 35 = Very Strong Trend (+10)
  let adxScore = 0;
  if (coin.adxValue > 35) {
    adxScore = 10;
  } else if (coin.adxValue > 25) {
    adxScore = 7;
  } else {
    adxScore = 3;
  }

  // 6. Liquidity Filter (Weight: 10%)
  // Ignore/penalize if MC < $50M or Daily Volume < $5M
  let liquidityScore = 10;
  const satisfiesLiquidity = coin.marketCap >= 50000000 && coin.volume24h >= 5000000;
  if (!satisfiesLiquidity) {
    liquidityScore = 0; // immediate flat penalty
  }

  // 7. Risk Filter (Penalties up to -30 pts)
  // Penalize coins with extremely large 24h candles (>15%)
  // Penalize coins showing signs of pump-and-dump behavior
  let riskPenalty = 0;
  if (Math.abs(coin.percentChange24h) > 15 || coin.candleLimitPenalized) {
    riskPenalty += 15; // subtract 15 points
  }
  if (coin.pumpDumpSuspected) {
    riskPenalty += 15; // subtract another 15 points
  }

  // Sum weights
  const grossScore = volumeMcScore + emaStructureScore + rsiDivergenceScore + volumeConfirmationScore + adxScore + liquidityScore;
  const finalScore = Math.max(0, Math.min(100, Math.round(grossScore - riskPenalty)));

  // Probability Rating Allocation
  let probabilityRating: 'A+' | 'A' | 'B' | 'C' = 'C';
  if (finalScore >= 90) {
    probabilityRating = 'A+';
  } else if (finalScore >= 82) {
    probabilityRating = 'A';
  } else if (finalScore >= 75) {
    probabilityRating = 'B';
  } else {
    probabilityRating = 'C';
  }

  return {
    ...coin,
    volumeMcRatio: volumeMcPercent,
    volumeMcScore,
    emaStructureScore,
    rsiDivergenceScore,
    volumeConfirmationScore,
    adxScore,
    liquidityScore,
    riskPenalty,
    finalScore,
    probabilityRating
  };
}

export function getRankedQuantAnalysis(coins: QuantCoin[] = ANALYST_COINS): ScoredCoin[] {
  return coins
    .map(c => calculateQuantScore(c))
    .sort((a, b) => b.finalScore - a.finalScore);
}
