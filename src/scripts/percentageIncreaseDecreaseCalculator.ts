import { setStatus, clearStatus } from "./helpers/status";
import { calculatePercentageIncreaseDecrease } from "../formulas/percentageIncreaseDecrease";
import { validateNumbers } from "../utils/validation";

const form = document.querySelector<HTMLFormElement>(
  "#percentage-increase-decrease-form"
);

const oldValueInput =
  document.querySelector<HTMLInputElement>("#old-value");

const newValueInput =
  document.querySelector<HTMLInputElement>("#new-value");

const resultValue =
  document.querySelector<HTMLElement>("#result-value");

const resultDescription =
  document.querySelector<HTMLElement>("#result-description");

if (
  form &&
  oldValueInput &&
  newValueInput &&
  resultValue &&
  resultDescription
) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const oldValue = Number(oldValueInput.value);
    const newValue = Number(newValueInput.value);

    const validation = validateNumbers({
      values: [oldValue, newValue],
      allowNegative: false,
      allowZero: false,
      allowDecimal: true,
      requireAll: true,
    });

    if (!validation.valid) {
      setStatus(
        resultValue,
        resultDescription,
        "Invalid input",
        validation.message,
        "error"
      );
      return;
    }

    try {
      const result = calculatePercentageIncreaseDecrease({
        oldValue,
        newValue,
      });

      let description = "";

      switch (result.direction) {
        case "increase":
          description = `${newValue} is ${result.percentage.toFixed(2)}% higher than ${oldValue}.`;
          break;

        case "decrease":
          description = `${newValue} is ${result.percentage.toFixed(2)}% lower than ${oldValue}.`;
          break;

        default:
          description = "There is no percentage change.";
      }

      setStatus(
        resultValue,
        resultDescription,
        `${result.percentage.toFixed(2)}%`,
        description,
        "success"
      );
    } catch (error) {
      setStatus(
        resultValue,
        resultDescription,
        "Invalid input",
        error instanceof Error ? error.message : "Calculation failed.",
        "error"
      );
    }
  });

  form.addEventListener("reset", () => {
    clearStatus(resultValue, resultDescription);
  });

  const clearResult = () => {
    clearStatus(resultValue, resultDescription);
  };

  oldValueInput.addEventListener("input", clearResult);
  newValueInput.addEventListener("input", clearResult);
}