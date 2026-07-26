import { createFAQ } from "../../faq";

export const percentageChangeFAQ = createFAQ([
  {
    question: "How do I calculate percentage change?",
    answer:
      "Subtract the original value from the new value, divide the result by the original value, then multiply by 100.",
  },
  {
    question: "What is the difference between percentage increase and percentage decrease?",
    answer:
      "A percentage increase means the new value is higher than the original value, while a percentage decrease means it is lower.",
  },
  {
    question: "Can this calculator calculate both increase and decrease?",
    answer:
      "Yes. Enter the original and new values and the calculator automatically determines whether the result is an increase or a decrease.",
  },
]);