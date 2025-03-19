import { z } from 'zod';
import { MarketData } from '../types/market';

const marketDataSchema = z.object({
  symbol: z.string(),
  price: z.number().positive(),
  timestamp: z.number().int(),
  volume: z.number().nonnegative(),
});

export class WebSocketClient {
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 5;
  private readonly reconnectDelay = 1000;
  private subscribers: ((data: MarketData) => void)[] = [];

  constructor(private readonly url: string) {}

  connect(): void {
    try {
      this.ws = new WebSocket(this.url);
      this.setupEventHandlers();
    } catch (error) {
      console.error('WebSocket connection error:', error);
      this.handleReconnect();
    }
  }

  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const validatedData = marketDataSchema.parse(data);
        this.notifySubscribers(validatedData);
      } catch (error) {
        console.error('Invalid market data received:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private handleReconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, this.reconnectDelay * Math.pow(2, this.reconnectAttempts));
  }

  subscribe(callback: (data: MarketData) => void): void {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: (data: MarketData) => void): void {
    this.subscribers = this.subscribers.filter(sub => sub !== callback);
  }

  private notifySubscribers(data: MarketData): void {
    this.subscribers.forEach(callback => callback(data));
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}