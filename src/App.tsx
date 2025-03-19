import React from 'react';
import { Activity, TrendingUp, BarChart2, Settings, Power } from 'lucide-react';
import { useStrategyStore } from './store/strategyStore';
import StrategyCard from './components/StrategyCard';
import PerformanceChart from './components/PerformanceChart';
import ActiveSignals from './components/ActiveSignals';
import BotControls from './components/BotControls';

function App() {
  const { strategies } = useStrategyStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">Trading Bot Dashboard</h1>
            </div>
            <BotControls />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h2>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <PerformanceChart />
            </div>
          </div>
        </div>

        {/* Trading Strategies */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Trading Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(strategies).map(([id, strategy]) => (
              <StrategyCard
                key={id}
                strategy={strategy}
                icon={
                  id === 'MA_CROSSOVER' ? TrendingUp :
                  id === 'RSI' ? BarChart2 :
                  Settings
                }
              />
            ))}
          </div>
        </div>

        {/* Active Signals */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Signals</h2>
          <ActiveSignals />
        </div>
      </main>
    </div>
  );
}

export default App;