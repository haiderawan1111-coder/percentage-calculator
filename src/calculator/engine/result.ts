import type { CalculatorResult } from "./types";

export function successResult(value: number): CalculatorResult {
  return {
    success: true,
    value,
    error: null,
  };
}

export function errorResult(message: string): CalculatorResult {
  return {
    success: false,
    value: null,
    error: message,
  };
}