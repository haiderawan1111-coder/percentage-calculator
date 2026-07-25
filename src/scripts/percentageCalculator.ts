import { setStatus, clearStatus } from "./helpers/status";
import { loadValuesFromUrl, saveValuesToUrl } from "./helpers/urlState";
import { registerKeyboardShortcuts } from "./helpers/keyboardShortcuts";
import { trackEvent } from "./helpers/analytics";
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

    trackEvent({
      name: "calculator_copy",
      data: {
        calculator: "percentage",
      },
    });

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

  const supportsNativeShare = "share" in navigator;

  try {
    if (supportsNativeShare) {
      await navigator.share({
        title: document.title,
        text: `Result: ${text}`,
        url: window.location.href,
      });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }

    trackEvent({
      name: "calculator_share",
      data: {
        calculator: "percentage",
        nativeShare: supportsNativeShare,
      },
    });

    shareButton.textContent = supportsNativeShare
      ? "✅ Shared!"
      : "🔗 Link Copied!";

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

  trackEvent({
    name: "calculator_print",
    data: {
      calculator: "percentage",
    },
  });

  window.print();

  setTimeout(() => {
    printButton.textContent = originalText ?? "🖨️ Print Result";
  }, 1000);
}

copyButton?.addEventListener("click", copyResult);
shareButton?.addEventListener("click", shareResult);
printButton?.addEventListener("click", printResult);

if (form && inputX && inputY && resultValue && resultDescription) {
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

    trackEvent({
      name: "calculator_calculate",
      data: {
        calculator: "percentage",
        percent,
        total,
        result,
      },
    });

    resultValue.focus({
      preventScroll: true,
    });

    resultValue.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  calculate();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    saveValuesToUrl(inputX.value, inputY.value);

    calculate();
  });

  form.addEventListener("reset", () => {
    clearStatus(resultValue, resultDescription);

    saveValuesToUrl("", "");

    inputX.focus();
  });

  const clearResult = () => {
    clearStatus(resultValue, resultDescription);

    saveValuesToUrl(inputX.value, inputY.value);
  };

  inputX.addEventListener("input", clearResult);
  inputY.addEventListener("input", clearResult);

  registerKeyboardShortcuts({
    onCalculate: () => {
      form.requestSubmit();
    },
    onReset: () => {
      form.reset();
    },
  });
}