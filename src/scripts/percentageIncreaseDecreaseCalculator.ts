import { setStatus, clearStatus } from "./helpers/status";
import { trackEvent } from "./helpers/analytics";
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

  const copyButton = document.querySelector<HTMLButtonElement>(
  "#copy-result-button"
);

const shareButton = document.querySelector<HTMLButtonElement>(
  "#share-result-button"
);

const printButton = document.querySelector<HTMLButtonElement>(
  "#print-result-button"
);

if (
  form &&
  oldValueInput &&
  newValueInput &&
  resultValue &&
  resultDescription
) {
  copyButton?.addEventListener("click", async () => {
  const text = resultValue.textContent?.trim();

  if (!text || text === "—") return;

  try {
    await navigator.clipboard.writeText(text);

    trackEvent({
      name: "calculator_copy",
      data: {
        calculator: "percentage-increase-decrease",
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
});

shareButton?.addEventListener("click", async () => {
  const text = resultValue.textContent?.trim();

  if (!text || text === "—") return;

  const supportsNativeShare = typeof navigator.share === "function";

  try {
    if (supportsNativeShare) {
      await navigator.share({
        title: document.title,
        text: `Result: ${text}`,
        url: window.location.href,
      });
    } else if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(window.location.href);
    }

    trackEvent({
      name: "calculator_share",
      data: {
        calculator: "percentage-increase-decrease",
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
});

printButton?.addEventListener("click", () => {
  const originalText = printButton.textContent;

  printButton.textContent = "🖨️ Printing...";

  trackEvent({
    name: "calculator_print",
    data: {
      calculator: "percentage-increase-decrease",
    },
  });

  window.print();

  setTimeout(() => {
    printButton.textContent = originalText ?? "🖨️ Print Result";
  }, 1000);
});
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