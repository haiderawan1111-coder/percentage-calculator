/**
 * Calculates sales tax amount and total price.
 */

export interface SalesTaxResult {
  taxAmount: number;
  totalPrice: number;
}

export function salesTax(
  subtotal: number,
  taxPercent: number
): SalesTaxResult | null {
  if (taxPercent < 0 || taxPercent > 100) {
    return null;
  }

  const taxAmount =
    subtotal * (taxPercent / 100);

  const totalPrice =
    subtotal + taxAmount;

  return {
    taxAmount,
    totalPrice,
  };
}