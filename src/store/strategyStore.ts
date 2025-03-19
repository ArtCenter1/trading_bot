import { create } from 'zustand';
import { StrategyType } from '../types/bot';
import { MovingAverageCrossover } from '../strategies/MovingAverageCrossover';
import { RSIStrategy } from '../strategies/RSI';
import { MACDStrategy } from '../strategies/MACD';

interface StrategyState {
  strategies: {
    MA_CROSSOVER: MovingAverageCrossover;
    RSI: RSIStrategy;
    MACD: MACDStrategy;
  };
  toggleStrategy: (id: StrategyType) => void;
  updateParameters: (id: StrategyType, parameters: Record<string, number>) => void;
}

export const useStrategyStore = create<StrategyState>((set) => ({
  strategies: {
    MA_CROSSOVER: new MovingAverageCrossover(),
    RSI: new RSIStrategy(),
    MACD: new MACDStrategy(),
  },
  toggleStrategy: (id) =>
    set((state) => ({
      strategies: {
        ...state.strategies,
        [id]: {
          ...state.strategies[id],
          isEnabled: !state.strategies[id].isEnabled,
        },
      },
    })),
  updateParameters: (id, parameters) =>
    set((state) => ({
      strategies: {
        ...state.strategies,
        [id]: {
          ...state.strategies[id],
          parameters: {
            ...state.strategies[id].parameters,
            ...parameters,
          },
        },
      },
    })),
}));