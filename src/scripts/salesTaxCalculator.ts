import { setStatus, clearStatus } from "./helpers/status";
import { trackEvent } from "./helpers/analytics";
import { salesTax } from "../calculator/formulas";
import { validateNumbers } from "../utils/validation";

const form =
  document.querySelector<HTMLFormElement>("#sales-tax-form");

const subtotalInput =
  document.querySelector<HTMLInputElement>("#subtotal");

const taxPercentInput =
  document.querySelector<HTMLInputElement>("#tax-percent");

const resultValue =
  document.querySelector<HTMLElement>("#result-value");

const resultDescription =
  document.querySelector<HTMLElement>("#result-description");

const copyButton =
  document.querySelector<HTMLButtonElement>("#copy-result-button");

const shareButton =
  document.querySelector<HTMLButtonElement>("#share-result-button");

const printButton =
  document.querySelector<HTMLButtonElement>("#print-result-button");

if (
  form &&
  subtotalInput &&
  taxPercentInput &&
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
          calculator: "sales-tax",
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

    const supportsNativeShare =
      typeof navigator.share === "function";

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
          calculator: "sales-tax",
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
        calculator: "sales-tax",
      },
    });

    window.print();

    setTimeout(() => {
      printButton.textContent =
        originalText ?? "🖨️ Print Result";
    }, 1000);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const subtotal = Number(subtotalInput.value);
    const taxPercent = Number(taxPercentInput.value);

    const validation = validateNumbers({
      values: [subtotal, taxPercent],
      allowNegative: false,
      allowZero: true,
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

    const result = salesTax(subtotal, taxPercent);

    if (!result) {
      setStatus(
        resultValue,
        resultDescription,
        "Invalid tax",
        "Please enter a tax rate between 0 and 100.",
        "error"
      );
      return;
    }

    setStatus(
      resultValue,
      resultDescription,
      `Total Price: ${result.totalPrice.toFixed(2)}`,
      `Subtotal: ${subtotal.toFixed(
        2
      )} • Sales Tax: ${result.taxAmount.toFixed(
        2
      )} (${taxPercent.toFixed(2)}%)`,
      "success"
    );
  });

  form.addEventListener("reset", () => {
    clearStatus(resultValue, resultDescription);
  });

  const clearResult = () => {
    clearStatus(resultValue, resultDescription);
  };

  subtotalInput.addEventListener("input", clearResult);
  taxPercentInput.addEventListener("input", clearResult);
}