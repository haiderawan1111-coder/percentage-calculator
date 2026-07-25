export interface KeyboardShortcutOptions {
  onCalculate: () => void;
  onReset: () => void;
}

export function registerKeyboardShortcuts(
  options: KeyboardShortcutOptions
) {
  document.addEventListener("keydown", (event) => {
    const target = event.target as HTMLElement | null;

    const isTyping =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement;

    // Enter = Calculate
    if (event.key === "Enter" && isTyping) {
      event.preventDefault();
      options.onCalculate();
      return;
    }

    // Escape = Reset
    if (event.key === "Escape") {
      event.preventDefault();
      options.onReset();
    }
  });
}