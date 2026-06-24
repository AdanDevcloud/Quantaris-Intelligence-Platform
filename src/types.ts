export interface CryptoPreset {
  id: string;
  name: string;
  symbol: string;
  volume: number;
  marketCap: number;
  iconColor: string;
}

export interface CalculationResult {
  ratio: number; // raw percentage (e.g., 5.23 for 5.23%)
  category: 'ultra-high' | 'high' | 'moderate' | 'low';
  categoryLabel: string;
  categoryColor: string;
  categoryDescription: string;
}
