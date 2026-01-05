import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { FunctionType } from '../types';
import { generatePoints } from '../utils/math';

interface GraphCanvasProps {
  type: FunctionType;
  a: number;
  b: number;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ type, a, b }) => {
  
  // Memoize data generation
  // Use step 0.2 for smoothness
  const data = useMemo(() => generatePoints(a, b, type, [-11, 11], 0.2), [a, b, type]);

  // Generate ticks for -10 to 10 step 1
  const ticks = useMemo(() => Array.from({ length: 21 }, (_, i) => i - 10), []);

  return (
    <div className="w-full aspect-square bg-white rounded-xl shadow-sm border border-slate-200 p-2 relative overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          
          <XAxis 
            dataKey="x" 
            type="number" 
            domain={[-10, 10]} 
            ticks={ticks}
            stroke="#64748b"
            allowDataOverflow={true}
            interval={0} // Force show all ticks? Recharts might hide some if tight.
            tick={{ fontSize: 10 }} // Make font smaller to fit
          />
          <YAxis 
            type="number" 
            domain={[-10, 10]} 
            ticks={ticks}
            stroke="#64748b"
            allowDataOverflow={true}
            interval={0}
            tick={{ fontSize: 10 }}
          />
          
          {/* Main Axis Lines (darker) */}
          <ReferenceLine x={0} stroke="#334155" strokeWidth={2} />
          <ReferenceLine y={0} stroke="#334155" strokeWidth={2} />

          <Line
            type="monotone"
            dataKey="y"
            stroke="#2563eb" 
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
            connectNulls={false} 
          />
        </LineChart>
      </ResponsiveContainer>
      
      {/* Labels for quadrants or axes tips */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-mono text-slate-400">y</div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400">x</div>
    </div>
  );
};