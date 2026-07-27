/**
 * Calculates discount amount and final price.
 */
export interface DiscountResult {
  discountAmount: number;
  finalPrice: number;
}

export function discount(
  originalPrice: number,
  discountPercent: number
): DiscountResult | null {
  if (discountPercent < 0 || discountPercent > 100) {
    return null;
  }

  const discountAmount =
    originalPrice * (discountPercent / 100);

  const finalPrice =
    originalPrice - discountAmount;

  return {
    discountAmount,
    finalPrice,
  };
}