import { setStatus, clearStatus } from "./helpers/status";
import { trackEvent } from "./helpers/analytics";
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
  actualInput &&
  experimentalInput &&
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
        data: { calculator: "percentage-error" },
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
          calculator: "percentage-error",
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
        calculator: "percentage-error",
      },
    });

    window.print();

    setTimeout(() => {
      printButton.textContent = originalText ?? "🖨️ Print Result";
    }, 1000);
  });
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