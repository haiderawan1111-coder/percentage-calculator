import { createFAQ } from "../../faq";

export const percentageIncreaseFAQ = createFAQ([
  {
    question: "How do you calculate percentage increase?",
    answer:
      "Subtract the original value from the new value, divide by the original value, and multiply the result by 100.",
  },
  {
    question: "When should I use a percentage increase calculator?",
    answer:
      "Use it whenever you want to measure how much a value has increased compared to its original value.",
  },
  {
    question: "Can the result be negative?",
    answer:
      "No. If the new value is lower than the original value, you should use a percentage decrease calculator instead.",
  },
]);