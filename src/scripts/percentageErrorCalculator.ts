import { setStatus, clearStatus } from "./helpers/status";
import { calculatePercentageError } from "../formulas/percentageError";
import { validateNumbers } from "../utils/validation";

const form = document.querySelector<HTMLFormElement>(
  "#percentage-error-form"
);

const actualInput =
  document.querySelector<HTMLInputElement>("#actual-value");

const experimentalInput =
  document.querySelector<HTMLInputElement>("#experimental-value");

const resultValue =
  document.querySelector<HTMLElement>("#result-value");

const resultDescription =
  document.querySelector<HTMLElement>("#result-description");

if (
  form &&
  actualInput &&
  experimentalInput &&
  resultValue &&
  resultDescription
) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const actual = Number(actualInput.value);
    const experimental = Number(experimentalInput.value);

    const validation = validateNumbers({
      values: [actual, experimental],
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
      const result = calculatePercentageError({
        actual,
        experimental,
      });

      setStatus(
        resultValue,
        resultDescription,
        `${result.percentageError.toFixed(2)}%`,
        `Percentage error between ${experimental} and ${actual} is ${result.percentageError.toFixed(2)}%.`,
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

  actualInput.addEventListener("input", clearResult);
  experimentalInput.addEventListener("input", clearResult);
}