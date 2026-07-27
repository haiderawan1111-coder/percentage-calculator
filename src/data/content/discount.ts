import { createContent } from "./createContent";

export const discountContent = createContent({
  howItWorks: {
    title: "How the Discount Calculator Works",
    body: [
      "Enter the original price.",
      "Enter the discount percentage.",
      "The calculator calculates the discount amount.",
      "The discount is subtracted from the original price.",
      "The final sale price is displayed instantly.",
    ],
  },

  example: {
    title: "Worked Example",
    steps: [
      "Original price = 100",
      "Discount = 20%",
      "Discount amount = 20",
      "Final price = 80",
    ],
    result: "The final sale price is 80.",
  },

  commonMistakes: {
    title: "Common Mistakes",
    body: [
      "Entering a discount greater than 100%.",
      "Confusing the discount amount with the final price.",
      "Entering incorrect percentage values.",
    ],
  },

  tips: {
    title: "Tips",
    body: [
      "Double-check the discount percentage.",
      "Use decimal prices for greater accuracy.",
      "Compare multiple discounts before purchasing.",
    ],
  },
});