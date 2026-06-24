import { CryptoPreset, CalculationResult } from './types';

export const POPULAR_CRYPSTOS: CryptoPreset[] = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    volume: 38240000000,
    marketCap: 1354000000000,
    iconColor: 'bg-amber-500 text-white',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    volume: 18450000000,
    marketCap: 385000000000,
    iconColor: 'bg-indigo-500 text-white',
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    volume: 3950000000,
    marketCap: 68400000000,
    iconColor: 'bg-purple-500 text-white',
  },
  {
    id: 'xrp',
    name: 'Ripple',
    symbol: 'XRP',
    volume: 1200000000,
    marketCap: 27000000000,
    iconColor: 'bg-sky-500 text-white',
  },
  {
    id: 'ada',
    name: 'Cardano',
    symbol: 'ADA',
    volume: 480000000,
    marketCap: 16500000000,
    iconColor: 'bg-blue-600 text-white',
  },
  {
    id: 'doge',
    name: 'Dogecoin',
    symbol: 'DOGE',
    volume: 1250000000,
    marketCap: 19800000000,
    iconColor: 'bg-yellow-500 text-white',
  }
];

export function determineLiquidityTier(ratio: number): CalculationResult {
  // Ratio is already in percentage format, e.g. 5.24 for 5.24%
  if (ratio > 20) {
    return {
      ratio,
      category: 'ultra-high',
      categoryLabel: 'Ultra High Liquidity',
      categoryColor: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-850',
      categoryDescription: 'Extremely high trading velocity. The coin is changing hands rapidly, typical of high-hype events, meme rallies, or massive day-trading volume.',
    };
  } else if (ratio >= 10) {
    return {
      ratio,
      category: 'high',
      categoryLabel: 'High Volatility / Liquidity',
      categoryColor: 'bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-950/20 dark:text-teal-400 dark:border-teal-850',
      categoryDescription: 'Strong trading volume relative to capital size. Suggests healthy liquid markets with active interest and moderate-to-high price discovery action.',
    };
  } else if (ratio >= 2) {
    return {
      ratio,
      category: 'moderate',
      categoryLabel: 'Healthy / Moderate Liquidity',
      categoryColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-850',
      categoryDescription: 'Standard healthy range for large, established layer-1 and utility protocols. Moderate trading interest without hyper-speculative bubbles.',
    };
  } else {
    return {
      ratio,
      category: 'low',
      categoryLabel: 'Low Liquidity Ratio',
      categoryColor: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-950/20 dark:text-slate-400 dark:border-slate-850',
      categoryDescription: 'Low activity relative to market size. May indicate long-term holder dominance ("HODLing") or stagnating interest. Watch out for wider bid-ask spreads.',
    };
  }
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1.0e12) return `$${(value / 1.0e12).toFixed(2)}T`;
  if (value >= 1.0e9) return `$${(value / 1.0e9).toFixed(2)}B`;
  if (value >= 1.0e6) return `$${(value / 1.0e6).toFixed(2)}M`;
  if (value >= 1.0e3) return `$${(value / 1.0e3).toFixed(2)}K`;
  return `$${value.toFixed(2)}`;
}
