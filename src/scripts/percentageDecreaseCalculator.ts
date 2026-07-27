import { setStatus, clearStatus } from "./helpers/status";
import { trackEvent } from "./helpers/analytics";
import { percentageDecrease } from "../calculator/formulas";
import { validateNumbers } from "../utils/validation";

const form = document.querySelector<HTMLFormElement>(
  "#percentage-decrease-form"
);

const valueInput =
  document.querySelector<HTMLInputElement>("#decrease-value");

const percentInput =
  document.querySelector<HTMLInputElement>("#decrease-percent");

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
  valueInput &&
  percentInput &&
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
          calculator: "percentage-decrease",
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
          calculator: "percentage-decrease",
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
        calculator: "percentage-decrease",
      },
    });

    window.print();

    setTimeout(() => {
      printButton.textContent = originalText ?? "🖨️ Print Result";
    }, 1000);
  });
  
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

    const result = percentageDecrease(value, percent);

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
      `${value} decreased by ${percent}% = ${result}`,
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