/**
 * Calculates the decreased value after subtracting a percentage.
 *
 * Example:
 * 100 decreased by 20% = 80
 */
export function percentageDecrease(
  value: number,
  percent: number
): number {
  return value - (value * percent) / 100;
}