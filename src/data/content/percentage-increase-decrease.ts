import { createContent } from "./createContent";

export const percentageIncreaseDecreaseContent = createContent({
  howItWorks: {
    title: "How the Percentage Increase / Decrease Calculator Works",
    body: [
      "Enter the original value.",
      "Enter the new value.",
      "The calculator compares both numbers.",
      "It determines whether the result is an increase or a decrease.",
      "The percentage difference is displayed instantly.",
    ],
  },

  example: {
    title: "Worked Example",
    steps: [
      "Original value = 250",
      "New value = 300",
      "Difference = 50",
      "50 ÷ 250 = 0.20",
      "0.20 × 100 = 20%",
    ],
    result: "The value increased by 20%.",
  },

  commonMistakes: {
    title: "Common Mistakes",
    body: [
      "Entering the new and original values in the wrong order.",
      "Confusing percentage change with percentage increase by a fixed percentage.",
      "Using the wrong base value for comparison.",
    ],
  },

  tips: {
    title: "Tips",
    body: [
      "Always enter the original value first.",
      "Use this calculator to compare prices, sales, population, and performance changes.",
      "Review the result to confirm whether it represents an increase or a decrease.",
    ],
  },
});