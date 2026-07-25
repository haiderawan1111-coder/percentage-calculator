import { setStatus, clearStatus } from "./helpers/status";
import { percentageIncrease } from "../calculator/formulas";
import { validateNumbers } from "../utils/validation";

const form = document.querySelector<HTMLFormElement>(
  "#percentage-increase-form"
);

const valueInput =
  document.querySelector<HTMLInputElement>("#increase-value");

const percentInput =
  document.querySelector<HTMLInputElement>("#increase-percent");

const resultValue =
  document.querySelector<HTMLElement>("#result-value");

const resultDescription =
  document.querySelector<HTMLElement>("#result-description");

if (
  form &&
  valueInput &&
  percentInput &&
  resultValue &&
  resultDescription
) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const value = Number(valueInput.value);
    const percent = Number(percentInput.value);

    const validation = validateNumbers({
      values: [value, percent],
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

    const result = percentageIncrease(value, percent);

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

    setStatus(
      resultValue,
      resultDescription,
      result.toString(),
      `${value} increased by ${percent}% = ${result}`,
      "success"
    );
  });

  form.addEventListener("reset", () => {
    clearStatus(resultValue, resultDescription);
  });

  const clearResult = () => {
    clearStatus(resultValue, resultDescription);
  };

  valueInput.addEventListener("input", clearResult);
  percentInput.addEventListener("input", clearResult);
}