export interface PercentageErrorInput {
  actual: number;
  experimental: number;
}

export interface PercentageErrorResult {
  percentageError: number;
}

export function calculatePercentageError(
  input: PercentageErrorInput,
): PercentageErrorResult {
  const { actual, experimental } = input;

  if (!Number.isFinite(actual) || !Number.isFinite(experimental)) {
    throw new Error("Inputs must be valid numbers.");
  }

  if (actual === 0) {
    throw new Error("Actual value cannot be zero.");
  }

  const percentageError =
    (Math.abs(experimental - actual) / Math.abs(actual)) * 100;

  return {
    percentageError,
  };
}