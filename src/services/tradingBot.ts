import { BotConfig, TradingSignal, StrategyType } from '../types/bot';
import { MarketData } from '../types/market';
import { WebSocketClient } from './websocket';
import { useStrategyStore } from '../store/strategyStore';
import { Logger } from '../utils/logger';

export class TradingBot {
  private readonly wsClient: WebSocketClient;
  private isRunning = false;
  private historicalData: MarketData[] = [];
  private readonly logger = Logger.getInstance();

  constructor(
    private readonly config: BotConfig,
    wsUrl: string
  ) {
    this.wsClient = new WebSocketClient(wsUrl);
  }

  start(): void {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.wsClient.connect();
    this.wsClient.subscribe(this.handleMarketData.bind(this));
    
    this.logger.info('Trading bot started');
  }

  stop(): void {
    if (!this.isRunning) return;
    
    this.isRunning = false;
    this.wsClient.disconnect();
    
    this.logger.info('Trading bot stopped');
  }

  private handleMarketData(data: MarketData): void {
    try {
      this.historicalData.push(data);
      // Keep last 100 data points for analysis
      if (this.historicalData.length > 100) {
        this.historicalData.shift();
      }

      const signals = this.analyzeMarketData(data);
      this.processSignals(signals);
    } catch (error) {
      this.logger.error('Error processing market data:', error);
    }
  }

  private analyzeMarketData(data: MarketData): TradingSignal[] {
    const store = useStrategyStore.getState();
    const enabledStrategies = Object.values(store.strategies).filter(s => s.isEnabled);
    
    return enabledStrategies
      .map(strategy => strategy.analyze(data, this.historicalData))
      .filter(signal => signal.type !== 'hold')
      .filter(signal => this.validateSignal(signal));
  }

  private validateSignal(signal: TradingSignal): boolean {
    const store = useStrategyStore.getState();
    const strategy = store.strategies[signal.strategy];
    
    if (!strategy || !strategy.isEnabled) {
      return false;
    }

    const { maxPositionSize } = this.config.riskManagement;
    
    if (!signal.quantity || signal.quantity > maxPositionSize) {
      return false;
    }
    
    return strategy.validateSignal(signal);
  }

  private processSignals(signals: TradingSignal[]): void {
    signals.forEach(signal => {
      try {
        this.logger.info('Processing signal:', signal);
        // Implement order execution logic here
      } catch (error) {
        this.logger.error('Error processing signal:', error);
      }
    });
  }
}