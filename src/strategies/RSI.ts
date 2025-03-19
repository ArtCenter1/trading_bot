import { MarketData } from '../types/market';
import { TradingStrategy, TradingSignal, StrategyType } from '../types/bot';

export class RSIStrategy implements TradingStrategy {
  public id: StrategyType = 'RSI';
  public name = 'Relative Strength Index';
  public description = 'Generates signals based on overbought and oversold conditions';
  public isEnabled = true;
  public parameters = {
    period: 14,
    overbought: 70,
    oversold: 30,
  };

  private calculateRSI(data: MarketData[]): number {
    if (data.length < this.parameters.period + 1) return 50;

    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= this.parameters.period; i++) {
      const difference = data[data.length - i].price - data[data.length - i - 1].price;
      if (difference >= 0) {
        gains += difference;
      } else {
        losses -= difference;
      }
    }

    const avgGain = gains / this.parameters.period;
    const avgLoss = losses / this.parameters.period;
    
    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
  }

  public analyze(data: MarketData, historicalData: MarketData[]): TradingSignal {
    const allData = [...historicalData, data];
    const rsi = this.calculateRSI(allData);

    let type: 'buy' | 'sell' | 'hold' = 'hold';
    let confidence = 0;

    if (rsi <= this.parameters.oversold) {
      type = 'buy';
      confidence = (this.parameters.oversold - rsi) / this.parameters.oversold;
    } else if (rsi >= this.parameters.overbought) {
      type = 'sell';
      confidence = (rsi - this.parameters.overbought) / (100 - this.parameters.overbought);
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
    return signal.confidence >= 0.3;
  }
}