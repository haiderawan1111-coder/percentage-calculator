import { executeCalculator } from "../calculator/engine";
import { percentageOf } from "../calculator/formulas";
import { validateNumbers } from "./validation";
/**
 * Calculates what X% of a given total (Y) is.
 *
 * Example:
 * calculatePercentage(20, 150) → 30
 */
export function calculatePercentage(
  percent: number,
  total: number
): number | null {
  const result = executeCalculator({
    validate: () =>
      validateNumbers({
        values: [percent, total],
        allowNegative: false,
        allowZero: false,
      }),

    calculate: () => percentageOf(percent, total),

    round: 2,
  });

  return result.success ? result.value : null;
}