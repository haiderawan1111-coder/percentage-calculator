import { createFAQ } from "../../faq";

export const percentageErrorFAQ = createFAQ([
  {
    question: "What is percentage error?",
    answer:
      "Percentage error measures how far a measured value is from the actual or accepted value, expressed as a percentage.",
  },
  {
    question: "How do I calculate percentage error?",
    answer:
      "Find the absolute difference between the measured and actual values, divide it by the actual value, then multiply by 100.",
  },
  {
    question: "When should I use a percentage error calculator?",
    answer:
      "Use it for science experiments, laboratory work, engineering calculations, and any situation where you need to compare a measured value with an accepted value.",
  },
]);