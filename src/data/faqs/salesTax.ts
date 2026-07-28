import { createFAQ } from "../../faq";

export const salesTaxFAQ = createFAQ([
  {
    question: "How do I calculate sales tax?",
    answer:
      "Multiply the subtotal by the sales tax percentage, divide by 100, then add the tax amount to the subtotal.",
  },
  {
    question: "How do I calculate the total price with tax?",
    answer:
      "Add the calculated sales tax amount to the subtotal to get the final total price.",
  },
  {
    question: "Can I use decimal values?",
    answer:
      "Yes. This calculator supports decimal prices and sales tax percentages.",
  },
]);