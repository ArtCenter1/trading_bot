export interface MarketData {
  symbol: string;
  price: number;
  timestamp: number;
  volume: number;
}

export interface Trade {
  id: string;
  symbol: string;
  side: 'buy' | 'sell';
  price: number;
  quantity: number;
  timestamp: number;
}

export interface OrderBook {
  symbol: string;
  bids: [number, number][]; // [price, quantity][]
  asks: [number, number][]; // [price, quantity][]
  timestamp: number;
}

export type TradingPair = {
  base: string;    // e.g., 'BTC'
  quote: string;   // e.g., 'USDT'
  symbol: string;  // e.g., 'BTCUSDT'
  minQuantity: number;
  maxQuantity: number;
  priceDecimals: number;
  quantityDecimals: number;
}