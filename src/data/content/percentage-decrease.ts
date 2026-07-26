import { createContent } from "./createContent";

export const percentageDecreaseContent = createContent({
  howItWorks: {
    title: "How the Percentage Decrease Calculator Works",
    body: [
      "Enter the original number.",
      "Enter the percentage to decrease.",
      "The calculator calculates the decrease amount.",
      "The decrease is subtracted from the original value.",
      "The final reduced value is displayed instantly.",
    ],
  },

  example: {
    title: "Worked Example",
    steps: [
      "Original value = 500",
      "Decrease = 20%",
      "20% of 500 = 100",
      "500 − 100 = 400",
    ],
    result: "The final value after a 20% decrease is 400.",
  },

  commonMistakes: {
    title: "Common Mistakes",
    body: [
      "Entering the percentage as a decimal instead of a whole percentage.",
      "Using the wrong starting value.",
      "Confusing percentage decrease with percentage change.",
    ],
  },

  tips: {
    title: "Tips",
    body: [
      "Enter only the percentage value (e.g. 20, not 0.20).",
      "Verify the original value before calculating.",
      "Use this calculator for discounts, depreciation, and price reductions.",
    ],
  },
});