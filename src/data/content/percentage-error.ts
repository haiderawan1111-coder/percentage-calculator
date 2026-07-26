import { createContent } from "./createContent";

export const percentageErrorContent = createContent({
  howItWorks: {
    title: "How It Works",
    body: [
      "Enter the actual (accepted) value.",
      "Enter the experimental (measured) value.",
      "The calculator computes the absolute difference, divides it by the actual value, and multiplies the result by 100.",
    ],
  },

  example: {
    title: "Worked Example",
    steps: [
      "Actual value = 100",
      "Experimental value = 95",
      "Difference = 5",
      "5 ÷ 100 = 0.05",
      "0.05 × 100 = 5%",
    ],
    result: "Percentage Error = 5%",
  },

  commonMistakes: {
    title: "Common Mistakes",
    body: [
      "Entering the actual and experimental values in the wrong fields.",
      "Using zero as the actual value.",
      "Confusing percentage error with percentage change.",
    ],
  },

  tips: {
    title: "Tips",
    body: [
      "Use the accepted value as the actual value.",
      "Double-check the measurement units before calculating.",
      "Percentage error is always reported as a positive value in this calculator.",
    ],
  },
});