import { MarketData, Trade, TradingPair } from './market';

export type StrategyType = 'MA_CROSSOVER' | 'RSI' | 'MACD';

export interface TradingStrategy {
  id: StrategyType;
  name: string;
  description: string;
  isEnabled: boolean;
  analyze: (data: MarketData, historicalData: MarketData[]) => TradingSignal;
  validateSignal: (signal: TradingSignal) => boolean;
  parameters: Record<string, number>;
}

export interface TradingSignal {
  type: 'buy' | 'sell' | 'hold';
  symbol: string;
  price: number;
  quantity?: number;
  confidence: number; // 0-1
  timestamp: number;
  strategy: StrategyType;
}

export interface BotConfig {
  pairs: TradingPair[];
  strategies: TradingStrategy[];
  riskManagement: RiskParameters;
}

export interface RiskParameters {
  maxPositionSize: number;
  maxDrawdown: number;
  stopLossPercentage: number;
  takeProfitPercentage: number;
  maxOpenPositions: number;
}