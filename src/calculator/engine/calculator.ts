import { roundTo } from "../../utils/math";
import { successResult, errorResult } from "./result";
import type { CalculatorConfig, CalculatorResult } from "./types";

export function executeCalculator(
  config: CalculatorConfig
): CalculatorResult {
  const validation = config.validate();

  if (!validation.valid) {
    return errorResult(validation.message);
  }

  const value = config.calculate();

  return successResult(
    roundTo(value, config.round ?? 2)
  );
}