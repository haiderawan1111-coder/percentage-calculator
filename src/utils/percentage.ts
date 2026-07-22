/**
 * Calculates what X% of a given total (Y) is.
 *
 * Example: calculatePercentage(20, 150) → 30
 * (because 20% of 150 is 30)
 *
 * @param percent - The percentage value (the "X" in "X% of Y")
 * @param total   - The total/base value (the "Y" in "X% of Y")
 * @returns The calculated result rounded to 2 decimal places,
 *          or null if the inputs are invalid.
 */
export function calculatePercentage(
  percent: number,
  total: number
): number | null {
  // --- Step 1: Check for "empty" values ---
  // When a number input is left empty and converted to a number,
  // JavaScript/TypeScript represents it as NaN ("Not a Number").
  // So checking for NaN also covers the "empty field" case.
  if (Number.isNaN(percent) || Number.isNaN(total)) {
    return null;
  }

  if (percent < 0 || total < 0) {
  return null;
}

if (total === 0) {
  return null;
}

  // --- Step 2: Prevent division-by-zero-style issues ---
  // If total is 0, the calculation wouldn't make logical sense
  // in this formula's context, so we return null instead of
  // producing a misleading result.
  if (total === 0) {
    return null;
  }

  // --- Step 3: Do the actual math ---
  // Formula: (percent / 100) * total
  // Example: (20 / 100) * 150 = 0.2 * 150 = 30
  const rawResult = (percent / 100) * total;

  // --- Step 4: Round to 2 decimal places ---
  // Math.round(x * 100) / 100 is a common, reliable way to round
  // to exactly 2 decimal places in JavaScript/TypeScript.
  // Example: 33.33333 → 33.33
  const roundedResult = Math.round(rawResult * 100) / 100;

  return roundedResult;
}