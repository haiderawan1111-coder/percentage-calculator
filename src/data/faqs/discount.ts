import { createFAQ } from "../../faq";

export const discountFAQ = createFAQ([
  {
    question: "How do I calculate a discount?",
    answer:
      "Multiply the original price by the discount percentage, divide by 100, then subtract the discount amount from the original price.",
  },
  {
    question: "How do I calculate the final sale price?",
    answer:
      "Subtract the discount amount from the original price to get the final sale price.",
  },
  {
    question: "Can I use decimal values?",
    answer:
      "Yes. This calculator supports decimal prices and discount percentages.",
  },
]);