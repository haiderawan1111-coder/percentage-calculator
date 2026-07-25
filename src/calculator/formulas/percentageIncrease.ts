/**
 * Calculates the increased value after applying a percentage.
 *
 * Example:
 * 100 increased by 20% = 120
 */
export function percentageIncrease(
  value: number,
  percent: number
): number {
  return value + (value * percent) / 100;
}