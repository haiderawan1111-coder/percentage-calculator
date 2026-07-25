/**
 * Rounds a number to the specified number of decimal places.
 *
 * Example:
 * roundTo(33.3333, 2) → 33.33
 */
export function roundTo(value: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

/**
 * Safely divides two numbers.
 *
 * Returns null when attempting to divide by zero.
 */
export function safeDivide(
  numerator: number,
  denominator: number
): number | null {
  if (denominator === 0) {
    return null;
  }

  return numerator / denominator;
}

/**
 * Restricts a value within a minimum and maximum range.
 *
 * Example:
 * clamp(120, 0, 100) → 100
 */
export function clamp(
  value: number,
  min: number,
  max: number
): number {
  return Math.min(Math.max(value, min), max);
}