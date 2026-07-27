import { setStatus, clearStatus } from "./helpers/status";
import { trackEvent } from "./helpers/analytics";
import { discount } from "../calculator/formulas";
import { validateNumbers } from "../utils/validation";

const form =
  document.querySelector<HTMLFormElement>("#discount-form");

const originalPriceInput =
  document.querySelector<HTMLInputElement>("#original-price");

const discountPercentInput =
  document.querySelector<HTMLInputElement>("#discount-percent");

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
  originalPriceInput &&
  discountPercentInput &&
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
          calculator: "discount",
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
          calculator: "discount",
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
        calculator: "discount",
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

    const originalPrice = Number(originalPriceInput.value);
    const discountPercent = Number(discountPercentInput.value);

    const validation = validateNumbers({
      values: [originalPrice, discountPercent],
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

    const result = discount(
      originalPrice,
      discountPercent
    );

    if (!result) {
      setStatus(
        resultValue,
        resultDescription,
        "Invalid discount",
        "Please enter a discount between 0 and 100.",
        "error"
      );
      return;
    }

setStatus(
  resultValue,
  resultDescription,
  `Final Price: ${result.finalPrice.toFixed(2)}`,
  `Original: ${originalPrice.toFixed(
    2
  )} • You Save: ${result.discountAmount.toFixed(
    2
  )} (${discountPercent.toFixed(2)}%)`,
  "success"
);
  });

  form.addEventListener("reset", () => {
    clearStatus(resultValue, resultDescription);
  });

  const clearResult = () => {
    clearStatus(resultValue, resultDescription);
  };

  originalPriceInput.addEventListener("input", clearResult);
  discountPercentInput.addEventListener("input", clearResult);
}