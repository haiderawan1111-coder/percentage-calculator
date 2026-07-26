import { createFormula } from "./createFormula";

export const percentageDecreaseFormula = createFormula({
  title: "Percentage Decrease Formula",

  formula:
    "Percentage Decrease = ((Original Value − New Value) ÷ Original Value) × 100",

  explanation:
    "Percentage decrease measures how much a value has decreased compared to its original value.",

  steps: [
    {
      title: "Step 1",
      content: "Subtract the new value from the original value.",
    },
    {
      title: "Step 2",
      content: "Divide the difference by the original value.",
    },
    {
      title: "Step 3",
      content: "Multiply the result by 100 to express it as a percentage.",
    },
  ],
});