/**
 * Calculates the percentage change between two values.
 *
 * Returns null when the old value is zero because
 * percentage change would be undefined.
 *
 * Example:
 * Old: 100
 * New: 120
 * Result: 20
 */
export function percentageChange(
  oldValue: number,
  newValue: number
): number | null {
  if (oldValue === 0) {
    return null;
  }

  return ((newValue - oldValue) / oldValue) * 100;
}