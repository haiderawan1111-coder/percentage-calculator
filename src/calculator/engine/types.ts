export interface CalculatorResult {
  success: boolean;
  value: number | null;
  error: string | null;
}

export interface CalculatorConfig {
  validate: () => {
    valid: boolean;
    message: string;
  };

  calculate: () => number;

  round?: number;
}