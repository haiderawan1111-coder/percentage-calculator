import { createFormula } from "./createFormula";

export const salesTaxFormula = createFormula({
  title: "Sales Tax Formula",

  formula:
    "Sales Tax = Subtotal × (Tax Rate ÷ 100)",

  explanation:
    "Total Price = Subtotal + Sales Tax",

  steps: [
    {
      title: "Step 1",
      content:
        "Convert the sales tax percentage into a decimal by dividing it by 100.",
    },
    {
      title: "Step 2",
      content:
        "Multiply the subtotal by the decimal tax rate to calculate the sales tax amount.",
    },
    {
      title: "Step 3",
      content:
        "Add the sales tax amount to the subtotal to get the final total price.",
    },
  ],
});