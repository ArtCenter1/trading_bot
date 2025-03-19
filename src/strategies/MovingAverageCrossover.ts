import { MarketData } from '../types/market';
import { TradingStrategy, TradingSignal, StrategyType } from '../types/bot';

export class MovingAverageCrossover implements TradingStrategy {
  public id: StrategyType = 'MA_CROSSOVER';
  public name = 'Moving Average Crossover';
  public description = 'Generates signals based on crossovers between short and long-term moving averages';
  public isEnabled = true;
  public parameters = {
    shortPeriod: 9,
    longPeriod: 21,
  };

  private calculateMA(data: MarketData[], period: number): number {
    if (data.length < period) return 0;
    const prices = data.slice(-period).map(d => d.price);
    return prices.reduce((sum, price) => sum + price, 0) / period;
  }

  public analyze(data: MarketData, historicalData: MarketData[]): TradingSignal {
    const allData = [...historicalData, data];
    const shortMA = this.calculateMA(allData, this.parameters.shortPeriod);
    const longMA = this.calculateMA(allData, this.parameters.longPeriod);

    const previousShortMA = this.calculateMA(historicalData, this.parameters.shortPeriod);
    const previousLongMA = this.calculateMA(historicalData, this.parameters.longPeriod);

    let type: 'buy' | 'sell' | 'hold' = 'hold';
    let confidence = 0;

    if (shortMA > longMA && previousShortMA <= previousLongMA) {
      type = 'buy';
      confidence = 0.8;
    } else if (shortMA < longMA && previousShortMA >= previousLongMA) {
      type = 'sell';
      confidence = 0.8;
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
    return signal.confidence >= 0.7;
  }
}