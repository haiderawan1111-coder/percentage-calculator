export interface PercentageChangeResult {
  oldValue: number;
  newValue: number;
  change: number;
  absoluteChange: number;
  direction: "increase" | "decrease" | "no-change";
}

export function calculatePercentageChange(
  oldValue: number,
  newValue: number
): PercentageChangeResult {
  if (!Number.isFinite(oldValue) || !Number.isFinite(newValue)) {
    throw new Error("Values must be valid numbers.");
  }

  if (oldValue === 0) {
    throw new Error("Old value cannot be zero.");
  }

  const absoluteChange = newValue - oldValue;

  const change = (absoluteChange / oldValue) * 100;

  let direction: PercentageChangeResult["direction"] = "no-change";

  if (absoluteChange > 0) direction = "increase";
  else if (absoluteChange < 0) direction = "decrease";

  return {
    oldValue,
    newValue,
    absoluteChange,
    change,
    direction,
  };
}