import { createFormula } from "./createFormula";

export const discountFormula = createFormula({
  title: "Discount Formula",

  formula:
    "Discount Amount = Original Price × (Discount ÷ 100)",

  explanation:
    "Final Price = Original Price − Discount Amount",

  steps: [
    {
      title: "Step 1",
      content:
        "Convert the discount percentage into a decimal by dividing it by 100.",
    },
    {
      title: "Step 2",
      content:
        "Multiply the original price by the decimal discount to calculate the discount amount.",
    },
    {
      title: "Step 3",
      content:
        "Subtract the discount amount from the original price to get the final sale price.",
    },
  ],
});