/**
 * Calculates what X% of a given total (Y) is.
 *
 * Formula:
 * (percent / 100) * total
 */
export function percentageOf(
  percent: number,
  total: number
): number {
  return (percent / 100) * total;
}