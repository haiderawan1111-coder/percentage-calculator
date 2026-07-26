import { createContent } from "./createContent";

export const percentageIncreaseContent = createContent({
  howItWorks: {
    title: "How the Percentage Increase Calculator Works",
    body: [
      "Enter the original number.",
      "Enter the percentage to increase.",
      "The calculator multiplies the original value by the percentage.",
      "The increase amount is added to the original value.",
      "The final increased value is displayed instantly.",
    ],
  },

  example: {
    title: "Worked Example",
    steps: [
      "Original value = 200",
      "Increase = 15%",
      "15% of 200 = 30",
      "200 + 30 = 230",
    ],
    result: "The final value after a 15% increase is 230.",
  },

  commonMistakes: {
    title: "Common Mistakes",
    body: [
      "Entering the percentage as a decimal instead of a percentage.",
      "Confusing percentage increase with percentage change.",
      "Using the wrong original value.",
    ],
  },

  tips: {
    title: "Tips",
    body: [
      "Double-check your original value before calculating.",
      "Enter only the percentage number (e.g. 15, not 0.15).",
      "Use this calculator for price increases, salary raises, and growth calculations.",
    ],
  },
});