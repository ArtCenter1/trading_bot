import { MarketData } from '../types/market';
import { TradingStrategy, TradingSignal, StrategyType } from '../types/bot';

export class MACDStrategy implements TradingStrategy {
  public id: StrategyType = 'MACD';
  public name = 'Moving Average Convergence Divergence';
  public description = 'Generates signals based on MACD line crossovers with signal line';
  public isEnabled = true;
  public parameters = {
    fastPeriod: 12,
    slowPeriod: 26,
    signalPeriod: 9,
  };

  private calculateEMA(data: MarketData[], period: number): number {
    if (data.length < period) return data[data.length - 1].price;

    const k = 2 / (period + 1);
    let ema = data[0].price;

    for (let i = 1; i < data.length; i++) {
      ema = data[i].price * k + ema * (1 - k);
    }

    return ema;
  }

  private calculateMACD(data: MarketData[]): { macd: number; signal: number } {
    const fastEMA = this.calculateEMA(data, this.parameters.fastPeriod);
    const slowEMA = this.calculateEMA(data, this.parameters.slowPeriod);
    const macd = fastEMA - slowEMA;

    const macdData = data.map((d, i) => ({
      ...d,
      price: this.calculateEMA(data.slice(0, i + 1), this.parameters.fastPeriod) -
             this.calculateEMA(data.slice(0, i + 1), this.parameters.slowPeriod),
    }));

    const signal = this.calculateEMA(macdData, this.parameters.signalPeriod);

    return { macd, signal };
  }

  public analyze(data: MarketData, historicalData: MarketData[]): TradingSignal {
    const allData = [...historicalData, data];
    if (allData.length < this.parameters.slowPeriod) {
      return {
        type: 'hold',
        symbol: data.symbol,
        price: data.price,
        confidence: 0,
        timestamp: data.timestamp,
        strategy: this.id,
      };
    }

    const current = this.calculateMACD(allData);
    const previous = this.calculateMACD(historicalData);

    let type: 'buy' | 'sell' | 'hold' = 'hold';
    let confidence = 0;

    if (current.macd > current.signal && previous.macd <= previous.signal) {
      type = 'buy';
      confidence = 0.7;
    } else if (current.macd < current.signal && previous.macd >= previous.signal) {
      type = 'sell';
      confidence = 0.7;
    }

    return {
      type,
      symbol: data.symbol,
      price: data.price,
      confidence,
      timestamp: data.timestamp,
      strategy: this.id,
    };
  }

  public validateSignal(signal: TradingSignal): boolean {
    return signal.confidence >= 0.6;
  }
}