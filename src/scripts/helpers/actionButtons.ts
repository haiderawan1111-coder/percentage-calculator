import { trackEvent } from "./analytics";

interface RegisterActionButtonsOptions {
  calculator: string;
  resultElement: HTMLElement;
}

export function registerActionButtons({
  calculator,
  resultElement,
}: RegisterActionButtonsOptions) {
  const copyButton = document.querySelector<HTMLButtonElement>(
    "#copy-result-button"
  );

  const shareButton = document.querySelector<HTMLButtonElement>(
    "#share-result-button"
  );

  const printButton = document.querySelector<HTMLButtonElement>(
    "#print-result-button"
  );

  copyButton?.addEventListener("click", async () => {
    const text = resultElement.textContent?.trim();

    if (!text || text === "—") return;

    try {
      await navigator.clipboard.writeText(text);

      trackEvent({
        name: "calculator_copy",
        data: { calculator },
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
    const text = resultElement.textContent?.trim();

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
          calculator,
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
      data: { calculator },
    });

    window.print();

    setTimeout(() => {
      printButton.textContent = originalText ?? "🖨️ Print Result";
    }, 1000);
  });
}