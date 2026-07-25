import { setStatus, clearStatus } from "./helpers/status";
import { loadValuesFromUrl, saveValuesToUrl } from "./helpers/urlState";
import { calculatePercentage } from "../utils/percentage";
import { validateNumbers } from "../utils/validation";

const form = document.querySelector<HTMLFormElement>("#percentage-form");
const inputX = document.querySelector<HTMLInputElement>("#percent-x");
const inputY = document.querySelector<HTMLInputElement>("#percent-y");
const resultValue = document.querySelector<HTMLElement>("#result-value");
const resultDescription =
  document.querySelector<HTMLElement>("#result-description");

const copyButton = document.querySelector<HTMLButtonElement>(
  "#copy-result-button"
);

const shareButton = document.querySelector<HTMLButtonElement>(
  "#share-result-button"
);

const printButton = document.querySelector<HTMLButtonElement>(
  "#print-result-button"
);

async function copyResult() {
  if (!resultValue || !copyButton) return;

  const text = resultValue.textContent?.trim();

  if (!text || text === "—") return;

  try {
    await navigator.clipboard.writeText(text);

    copyButton.textContent = "✅ Copied!";

    setTimeout(() => {
      copyButton.textContent = "📋 Copy Result";
    }, 2000);
  } catch {
    copyButton.textContent = "❌ Copy Failed";

    setTimeout(() => {
      copyButton.textContent = "📋 Copy Result";
    }, 2000);
  }
}

async function shareResult() {
  if (!resultValue || !shareButton) return;

  const text = resultValue.textContent?.trim();

  if (!text || text === "—") return;

  try {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        text: `Result: ${text}`,
        url: window.location.href,
      });

      shareButton.textContent = "✅ Shared!";
    } else {
      await navigator.clipboard.writeText(window.location.href);

      shareButton.textContent = "🔗 Link Copied!";
    }

    setTimeout(() => {
      shareButton.textContent = "🔗 Share Result";
    }, 2000);
  } catch {
    shareButton.textContent = "❌ Share Failed";

    setTimeout(() => {
      shareButton.textContent = "🔗 Share Result";
    }, 2000);
  }
}

function printResult() {
  if (!printButton) return;

  const originalText = printButton.textContent;

  printButton.textContent = "🖨️ Printing...";

  window.print();

  setTimeout(() => {
    printButton.textContent = originalText ?? "🖨️ Print Result";
  }, 1000);
}

copyButton?.addEventListener("click", copyResult);
shareButton?.addEventListener("click", shareResult);
printButton?.addEventListener("click", printResult);

if (form && inputX && inputY && resultValue && resultDescription) {
  // Restore values from URL
  loadValuesFromUrl(inputX, inputY);

  const calculate = () => {
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
      clearStatus(resultValue, resultDescription);
      return;
    }

    const result = calculatePercentage(percent, total);

    if (result === null) {
      clearStatus(resultValue, resultDescription);
      return;
    }

    setStatus(
      resultValue,
      resultDescription,
      result.toString(),
      `${percent}% of ${total} = ${result}`,
      "success"
    );
  };

  // Auto calculate after restoring values
  calculate();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    saveValuesToUrl(inputX.value, inputY.value);

    calculate();
  });

  form.addEventListener("reset", () => {
    clearStatus(resultValue, resultDescription);

    saveValuesToUrl("", "");
  });

  const clearResult = () => {
    clearStatus(resultValue, resultDescription);

    saveValuesToUrl(inputX.value, inputY.value);
  };

  inputX.addEventListener("input", clearResult);
  inputY.addEventListener("input", clearResult);
}