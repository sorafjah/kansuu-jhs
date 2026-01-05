import React from 'react';
import { FunctionType } from '../types';
import { toFraction } from '../utils/math';

interface EquationDisplayProps {
  type: FunctionType;
  a: number;
  b: number;
}

const FractionDisplay: React.FC<{ value: number; omitOne?: boolean }> = ({ value, omitOne = false }) => {
  const f = toFraction(value);

  if (f.sign === 0) return <span>0</span>;

  // Render integer
  if (f.isInteger) {
    if (omitOne && f.numerator === 1) {
       return f.sign === -1 ? <span>-</span> : null;
    }
    return <span>{f.sign === -1 ? '-' : ''}{f.numerator}</span>;
  }

  // Render fraction
  return (
    <div className="inline-flex items-center mx-1">
      {f.sign === -1 && <span className="mr-1 font-bold">-</span>}
      <div className="flex flex-col items-center text-center leading-none">
        <span className="border-b border-slate-800 w-full px-1">{f.numerator}</span>
        <span>{f.denominator}</span>
      </div>
    </div>
  );
};

export const EquationDisplay: React.FC<EquationDisplayProps> = ({ type, a, b }) => {
  
  return (
    <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-slate-200 min-h-[100px]">
      <div className="text-3xl font-serif italic text-slate-800 flex items-center gap-1">
        <span className="mr-2">y =</span>

        {/* PROPORTIONAL: y = ax */}
        {type === FunctionType.PROPORTIONAL && (
          a === 0 ? <span>0</span> : (
            <>
              <FractionDisplay value={a} omitOne />
              <span className="ml-0.5">x</span>
            </>
          )
        )}

        {/* INVERSE: y = a/x */}
        {type === FunctionType.INVERSE_PROPORTIONAL && (
           a === 0 ? <span>0</span> :
           (() => {
             const f = toFraction(a);
             const isNeg = f.sign === -1;
             
             return (
               <div className="inline-flex items-center">
                 {isNeg && <span className="mr-1">-</span>}
                 <div className="flex flex-col items-center text-center leading-none">
                   <span className="border-b border-slate-800 w-full px-1">{f.numerator}</span>
                   <span>
                    {f.denominator !== 1 ? f.denominator : ''}x
                   </span>
                 </div>
               </div>
             )
           })()
        )}

        {/* LINEAR: y = ax + b */}
        {type === FunctionType.LINEAR && (
          (() => {
            if (a === 0) return <span>{b}</span>;
            return (
              <>
                <FractionDisplay value={a} omitOne />
                <span className="ml-0.5">x</span>
                {b !== 0 && (
                  <>
                    <span className="mx-2 text-slate-400">{b > 0 ? '+' : '-'}</span>
                    <span>{Math.abs(b)}</span>
                  </>
                )}
              </>
            );
          })()
        )}

        {/* QUADRATIC: y = ax² */}
        {type === FunctionType.QUADRATIC && (
          a === 0 ? <span>0</span> : (
            <>
              <FractionDisplay value={a} omitOne />
              <span className="ml-0.5">x²</span>
            </>
          )
        )}
      </div>
    </div>
  );
};