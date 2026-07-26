import { createFAQ } from "../../faq";

export const percentageDecreaseFAQ = createFAQ([
  {
    question: "How do you calculate percentage decrease?",
    answer:
      "Subtract the new value from the original value, divide by the original value, and multiply the result by 100.",
  },
  {
    question: "When should I use a percentage decrease calculator?",
    answer:
      "Use it whenever a value becomes smaller and you want to know the percentage decrease from the original value.",
  },
  {
    question: "Can percentage decrease be greater than 100%?",
    answer:
      "No. A percentage decrease ranges from 0% to 100% because a value cannot decrease by more than its entire original amount.",
  },
]);