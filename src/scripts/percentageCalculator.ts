import { setStatus, clearStatus } from "./helpers/status";
import { calculatePercentage } from "../utils/percentage";
import { validateNumbers } from "../utils/validation";

const form = document.querySelector<HTMLFormElement>("#percentage-form");
const inputX = document.querySelector<HTMLInputElement>("#percent-x");
const inputY = document.querySelector<HTMLInputElement>("#percent-y");
const resultValue = document.querySelector<HTMLElement>("#result-value");
const resultDescription =
  document.querySelector<HTMLElement>("#result-description");

if (form && inputX && inputY && resultValue && resultDescription) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const percent = Number(inputX.value);
    const total = Number(inputY.value);

    const validation = validateNumbers({
      values: [percent, total],
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

    const result = calculatePercentage(percent, total);

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
      `${percent}% of ${total} = ${result}`,
      "success"
    );
  });

  form.addEventListener("reset", () => {
    clearStatus(resultValue, resultDescription);
  });

  const clearResult = () => {
    clearStatus(resultValue, resultDescription);
  };

  inputX.addEventListener("input", clearResult);
  inputY.addEventListener("input", clearResult);
}