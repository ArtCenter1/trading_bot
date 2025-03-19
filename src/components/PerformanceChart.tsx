import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock data - replace with real data from your trading bot
const data = [
  { timestamp: '00:00', portfolio: 10000, benchmark: 10000 },
  { timestamp: '04:00', portfolio: 10200, benchmark: 10050 },
  { timestamp: '08:00', portfolio: 10150, benchmark: 10025 },
  { timestamp: '12:00', portfolio: 10300, benchmark: 10100 },
  { timestamp: '16:00', portfolio: 10400, benchmark: 10150 },
  { timestamp: '20:00', portfolio: 10450, benchmark: 10200 },
];

const PerformanceChart: React.FC = () => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="portfolio"
            stroke="#4F46E5"
            strokeWidth={2}
            dot={false}
            name="Portfolio Value"
          />
          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="#9CA3AF"
            strokeWidth={2}
            dot={false}
            name="Benchmark"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;