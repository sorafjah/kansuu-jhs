import { Fraction } from '../types';

/**
 * Calculates the Greatest Common Divisor
 */
const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

/**
 * Converts a decimal number to a fraction representation.
 * Handles precision up to a certain point to avoid messy fractions like 333/1000.
 */
export const toFraction = (value: number): Fraction => {
  if (value === 0) {
    return { numerator: 0, denominator: 1, sign: 0, isInteger: true };
  }

  const sign = value < 0 ? -1 : 1;
  const absValue = Math.abs(value);

  // Check if integer (or close enough)
  if (Math.abs(Math.round(absValue) - absValue) < 0.0001) {
    return {
      numerator: Math.round(absValue),
      denominator: 1,
      sign,
      isInteger: true,
    };
  }

  // Convert decimal to fraction
  // We'll use a tolerance approach or max denominator to keep it "middle school clean"
  // Multiply by powers of 10
  let denominator = 1;
  let numerator = absValue;
  
  while (Math.abs(Math.round(numerator) - numerator) > 0.0001 && denominator < 1000) {
    numerator *= 10;
    denominator *= 10;
  }

  numerator = Math.round(numerator);
  
  const commonDivisor = gcd(numerator, denominator);
  
  return {
    numerator: numerator / commonDivisor,
    denominator: denominator / commonDivisor,
    sign,
    isInteger: false,
  };
};

/**
 * Generates points for the graph based on the function type and parameters
 */
export const generatePoints = (
  a: number,
  b: number,
  funcType: string,
  rangeX: [number, number] = [-10, 10],
  step: number = 0.5
) => {
  const points: { x: number; y: number | null }[] = [];
  const xValues = new Set<number>();

  // Generate standard grid points
  // Using a slightly finer step than default 0.5 can help, but relying on injected points for curves is better.
  // We'll use the passed step (usually 0.2 from GraphCanvas)
  for (let x = rangeX[0]; x <= rangeX[1]; x = parseFloat((x + step).toFixed(2))) {
    xValues.add(x);
  }

  // For inverse proportion, add points near zero to ensure graph extends to the Y-axis edges
  if (funcType === 'INVERSE_PROPORTIONAL') {
    // Add points that are likely to push y towards 10/-10 even when a is small.
    // e.g., if a=0.5, x=0.05 gives y=10.
    const extraPoints = [
      0.01, 0.02, 0.04, 0.05, 0.08, 0.1, 0.15,
      -0.01, -0.02, -0.04, -0.05, -0.08, -0.1, -0.15
    ];
    extraPoints.forEach(x => xValues.add(x));
    
    // Ensure 0 is present to force a break in the line
    xValues.add(0);
  }

  // Convert Set to sorted array
  const sortedX = Array.from(xValues).sort((a, b) => a - b);

  for (const x of sortedX) {
    let y: number | null = null;

    if (funcType === 'INVERSE_PROPORTIONAL' && Math.abs(x) < 0.0001) {
      // Exact 0 (or close enough) is undefined/break
      y = null;
    } else {
      switch (funcType) {
        case 'PROPORTIONAL':
          y = a * x;
          break;
        case 'INVERSE_PROPORTIONAL':
          y = x === 0 ? null : a / x;
          break;
        case 'LINEAR':
          y = a * x + b;
          break;
        case 'QUADRATIC':
          y = a * x * x;
          break;
      }
    }
    
    points.push({ x, y });
  }
  
  return points;
};