export interface PercentageIncreaseDecreaseInput {
  oldValue: number;
  newValue: number;
}

export interface PercentageIncreaseDecreaseResult {
  percentage: number;
  direction: "increase" | "decrease" | "no-change";
}

export function calculatePercentageIncreaseDecrease(
  input: PercentageIncreaseDecreaseInput,
): PercentageIncreaseDecreaseResult {
  const { oldValue, newValue } = input;

  if (!Number.isFinite(oldValue) || !Number.isFinite(newValue)) {
    throw new Error("Inputs must be valid numbers.");
  }

  if (oldValue === 0) {
    throw new Error("Old value cannot be zero.");
  }

  const change = ((newValue - oldValue) / oldValue) * 100;

  if (change > 0) {
    return {
      percentage: Math.abs(change),
      direction: "increase",
    };
  }

  if (change < 0) {
    return {
      percentage: Math.abs(change),
      direction: "decrease",
    };
  }

  return {
    percentage: 0,
    direction: "no-change",
  };
}