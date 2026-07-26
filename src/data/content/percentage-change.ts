import { createContent } from "./createContent";

export const percentageChangeContent = createContent({
  howItWorks: {
    title: "How the Percentage Change Calculator Works",
    body: [
      "Enter the original value.",
      "Enter the new value.",
      "The calculator compares both values.",
      "It determines whether the value increased or decreased.",
      "The percentage change is calculated instantly.",
    ],
  },

  example: {
    title: "Worked Example",
    steps: [
      "Original value = 80",
      "New value = 100",
      "Difference = 100 − 80 = 20",
      "20 ÷ 80 = 0.25",
      "0.25 × 100 = 25%",
    ],
    result: "The percentage change is 25% (increase).",
  },

  commonMistakes: {
    title: "Common Mistakes",
    body: [
      "Using the new value instead of the original value as the base.",
      "Ignoring whether the result is an increase or decrease.",
      "Entering values in the wrong order.",
    ],
  },

  tips: {
    title: "Tips",
    body: [
      "Always use the original value as the starting point.",
      "Double-check the order of your values.",
      "Use decimal values when greater precision is required.",
    ],
  },
});