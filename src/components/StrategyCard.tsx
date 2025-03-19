import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useStrategyStore } from '../store/strategyStore';
import { TradingStrategy } from '../types/bot';

interface StrategyCardProps {
  strategy: TradingStrategy;
  icon: LucideIcon;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, icon: Icon }) => {
  const toggleStrategy = useStrategyStore(state => state.toggleStrategy);
  const updateParameters = useStrategyStore(state => state.updateParameters);

  const handleToggle = () => {
    toggleStrategy(strategy.id);
  };

  const handleParameterChange = (key: string, value: string) => {
    updateParameters(strategy.id, { [key]: Number(value) });
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Icon className="h-6 w-6 text-indigo-600" />
            <h3 className="ml-2 text-lg font-medium text-gray-900">{strategy.name}</h3>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={strategy.isEnabled}
              onChange={handleToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">{strategy.description}</p>
        
        <div className="space-y-3">
          {Object.entries(strategy.parameters).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </label>
              <input
                type="number"
                className="w-24 px-2 py-1 text-right border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={value}
                onChange={(e) => handleParameterChange(key, e.target.value)}
                disabled={!strategy.isEnabled}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyCard;