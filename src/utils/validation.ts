export interface ValidationOptions {
  values: number[];
  requireAll?: boolean;
  allowNegative?: boolean;
  allowZero?: boolean;
  allowDecimal?: boolean;
  min?: number;
  max?: number;
}

export interface ValidationResult {
  valid: boolean;
  message: string;
}

export function validateNumbers(
  options: ValidationOptions
): ValidationResult {
  const {
    values,
    requireAll = true,
    allowNegative = false,
    allowZero = true,
    allowDecimal = true,
    min,
    max,
  } = options;

  if (requireAll && values.some((value) => Number.isNaN(value))) {
    return {
      valid: false,
      message: "Please enter valid numbers.",
    };
  }

  if (!allowNegative && values.some((value) => value < 0)) {
    return {
      valid: false,
      message: "Negative numbers are not allowed.",
    };
  }

  if (!allowZero && values.some((value) => value === 0)) {
    return {
      valid: false,
      message: "Zero is not allowed.",
    };
  }

  if (!allowDecimal && values.some((value) => !Number.isInteger(value))) {
    return {
      valid: false,
      message: "Decimal values are not allowed.",
    };
  }

  if (
    min !== undefined &&
    values.some((value) => value < min)
  ) {
    return {
      valid: false,
      message: `Minimum allowed value is ${min}.`,
    };
  }

  if (
    max !== undefined &&
    values.some((value) => value > max)
  ) {
    return {
      valid: false,
      message: `Maximum allowed value is ${max}.`,
    };
  }

  return {
    valid: true,
    message: "",
  };
}