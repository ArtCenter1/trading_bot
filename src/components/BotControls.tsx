import React, { useState } from 'react';
import { Power, AlertCircle } from 'lucide-react';

const BotControls: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  
  const handleToggle = () => {
    setIsRunning(!isRunning);
    // Implement actual bot start/stop logic here
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <span className="relative flex h-3 w-3 mr-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isRunning ? 'bg-green-400' : 'bg-red-400'}`}></span>
          <span className={`relative inline-flex rounded-full h-3 w-3 ${isRunning ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </span>
        <span className="text-sm font-medium text-gray-700">
          {isRunning ? 'Running' : 'Stopped'}
        </span>
      </div>
      
      <button
        onClick={handleToggle}
        className={`inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isRunning
            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
            : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
        }`}
      >
        <Power className="h-4 w-4 mr-2" />
        {isRunning ? 'Stop Bot' : 'Start Bot'}
      </button>

      <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <AlertCircle className="h-4 w-4" />
      </button>
    </div>
  );
};

export default BotControls;