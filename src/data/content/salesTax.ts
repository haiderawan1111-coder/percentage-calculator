import { createContent } from "./createContent";

export const salesTaxContent = createContent({
  howItWorks: {
    title: "How the Sales Tax Calculator Works",
    body: [
      "Enter the subtotal.",
      "Enter the sales tax percentage.",
      "The calculator calculates the sales tax amount.",
      "The sales tax is added to the subtotal.",
      "The final total price is displayed instantly.",
    ],
  },

  example: {
    title: "Worked Example",
    steps: [
      "Subtotal = 100",
      "Sales Tax = 8%",
      "Sales Tax Amount = 8",
      "Total Price = 108",
    ],
    result: "The final total price is 108.",
  },

  commonMistakes: {
    title: "Common Mistakes",
    body: [
      "Entering an incorrect sales tax percentage.",
      "Confusing the tax amount with the total price.",
      "Forgetting that the tax is added to the subtotal.",
    ],
  },

  tips: {
    title: "Tips",
    body: [
      "Verify your local sales tax rate.",
      "Use decimal values for accurate calculations.",
      "Double-check the subtotal before calculating.",
    ],
  },
});