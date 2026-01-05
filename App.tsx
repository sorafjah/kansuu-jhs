import React, { useState } from 'react';
import { FunctionType, FunctionConfig } from './types';
import { EquationDisplay } from './components/EquationDisplay';
import { ControlPanel } from './components/ControlPanel';
import { GraphCanvas } from './components/GraphCanvas';

const FUNCTIONS: FunctionConfig[] = [
  { id: FunctionType.PROPORTIONAL, label: '比例', formula: 'y = ax', description: '原点を通る直線' },
  { id: FunctionType.INVERSE_PROPORTIONAL, label: '反比例', formula: 'y = a/x', description: '双曲線' },
  { id: FunctionType.LINEAR, label: '一次関数', formula: 'y = ax + b', description: '直線' },
  { id: FunctionType.QUADRATIC, label: '二次関数', formula: 'y = ax²', description: '放物線' },
];

export default function App() {
  const [selectedType, setSelectedType] = useState<FunctionType>(FunctionType.PROPORTIONAL);
  
  // Separate state for coefficients helps preserve values when switching tabs, 
  // or we can reset them. Resetting is usually less confusing for education.
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0);

  const handleTypeChange = (type: FunctionType) => {
    setSelectedType(type);
    // Reset defaults for better UX
    setA(type === FunctionType.INVERSE_PROPORTIONAL ? 4 : 1);
    setB(0);
  };

  const currentConfig = FUNCTIONS.find(f => f.id === selectedType)!;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">関数グラフ・シミュレーター</h1>
          <p className="text-slate-500">スライダーを動かして、グラフの形と式の変化を見てみよう</p>
        </header>

        {/* Tab Navigation */}
        <nav className="flex flex-wrap justify-center gap-2 p-1 bg-slate-200 rounded-xl max-w-2xl mx-auto">
          {FUNCTIONS.map((func) => (
            <button
              key={func.id}
              onClick={() => handleTypeChange(func.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex-1 sm:flex-none
                ${selectedType === func.id 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-300/50 hover:text-slate-800'}
              `}
            >
              <span className="block">{func.label}</span>
              <span className="text-xs opacity-70 font-serif hidden sm:block">{func.formula}</span>
            </button>
          ))}
        </nav>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Controls & Equation */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Function Info */}
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg text-blue-800 text-sm">
              <span className="font-bold">Point:</span> {currentConfig.description}
            </div>

            {/* Live Equation Display */}
            <EquationDisplay type={selectedType} a={a} b={b} />

            {/* Sliders */}
            <ControlPanel 
              type={selectedType} 
              a={a} 
              setA={setA} 
              b={b} 
              setB={setB} 
            />
          </div>

          {/* Right Column: Graph */}
          <div className="lg:col-span-7">
            <GraphCanvas type={selectedType} a={a} b={b} />
            <p className="mt-2 text-center text-xs text-slate-400">
              ※ ピンチズームやドラッグは無効化されています（固定座標系）
            </p>
          </div>
        </main>

        <footer className="text-center text-slate-400 text-xs pt-8 border-t border-slate-200">
          <p>Created for Middle School Mathematics Education</p>
        </footer>
      </div>
    </div>
  );
}