import { setStatus, clearStatus } from "./helpers/status";
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

copyButton?.addEventListener("click", copyResult);
shareButton?.addEventListener("click", shareResult);

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