import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

// Mock data - replace with real signals from your trading bot
const mockSignals = [
  {
    id: 1,
    type: 'buy',
    symbol: 'BTC/USDT',
    price: 65432.10,
    confidence: 0.85,
    strategy: 'MA_CROSSOVER',
    timestamp: new Date().getTime(),
  },
  {
    id: 2,
    type: 'sell',
    symbol: 'ETH/USDT',
    price: 3456.78,
    confidence: 0.75,
    strategy: 'RSI',
    timestamp: new Date().getTime() - 300000,
  },
];

const ActiveSignals: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symbol</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Strategy</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockSignals.map((signal) => (
            <tr key={signal.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {signal.type === 'buy' ? (
                    <ArrowUpCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className={`ml-2 ${signal.type === 'buy' ? 'text-green-600' : 'text-red-600'}`}>
                    {signal.type.toUpperCase()}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{signal.symbol}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${signal.price.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${signal.confidence * 100}%` }}
                  ></div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{signal.strategy}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(signal.timestamp).toLocaleTimeString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveSignals;