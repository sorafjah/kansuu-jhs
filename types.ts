export enum FunctionType {
  PROPORTIONAL = 'PROPORTIONAL', // y = ax
  INVERSE_PROPORTIONAL = 'INVERSE_PROPORTIONAL', // y = a/x
  LINEAR = 'LINEAR', // y = ax + b
  QUADRATIC = 'QUADRATIC', // y = ax^2
}

export interface FunctionConfig {
  id: FunctionType;
  label: string;
  formula: string;
  description: string;
}

export interface Fraction {
  numerator: number;
  denominator: number;
  sign: -1 | 0 | 1;
  isInteger: boolean;
}