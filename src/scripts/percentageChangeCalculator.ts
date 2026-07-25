import { setStatus, clearStatus } from "./helpers/status";
import { percentageChange } from "../calculator/formulas";
import { validateNumbers } from "../utils/validation";

const form = document.querySelector<HTMLFormElement>(
  "#percentage-change-form"
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

    const result = percentageChange(oldValue, newValue);

    if (result === null) {
      setStatus(
        resultValue,
        resultDescription,
        "Invalid input",
        "Please enter valid values.",
        "error"
      );
      return;
    }

    const direction =
      result > 0
        ? "increase"
        : result < 0
        ? "decrease"
        : "no change";

    setStatus(
      resultValue,
      resultDescription,
      `${result.toFixed(2)}%`,
      `Percentage ${direction} from ${oldValue} to ${newValue} is ${result.toFixed(2)}%.`,
      "success"
    );
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