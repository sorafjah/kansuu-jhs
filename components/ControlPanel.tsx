import React from 'react';
import { FunctionType } from '../types';

interface ControlPanelProps {
  type: FunctionType;
  a: number;
  setA: (val: number) => void;
  b: number;
  setB: (val: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ type, a, setA, b, setB }) => {
  
  // Helper to make the slider steps "nice" (halves, quarters, integers)
  const step = 0.5;

  return (
    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-6">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">パラメータ操作</h3>
      
      {/* Parameter A Control */}
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="slider-a" className="font-serif italic text-lg text-slate-700">a = {a}</label>
          <span className="text-xs text-slate-400">傾き / 比例定数</span>
        </div>
        <input
          id="slider-a"
          type="range"
          min="-5"
          max="5"
          step={step}
          value={a}
          onChange={(e) => setA(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-slate-400 font-mono">
          <span>-5</span>
          <span>0</span>
          <span>5</span>
        </div>
      </div>

      {/* Parameter B Control - Only for Linear */}
      {type === FunctionType.LINEAR && (
        <div className="space-y-2 pt-4 border-t border-slate-200">
           <div className="flex justify-between items-center mb-1">
            <label htmlFor="slider-b" className="font-serif italic text-lg text-slate-700">b = {b}</label>
            <span className="text-xs text-slate-400">切片</span>
          </div>
          <input
            id="slider-b"
            type="range"
            min="-10"
            max="10"
            step="1"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
           <div className="flex justify-between text-xs text-slate-400 font-mono">
            <span>-10</span>
            <span>0</span>
            <span>10</span>
          </div>
        </div>
      )}
    </div>
  );
};