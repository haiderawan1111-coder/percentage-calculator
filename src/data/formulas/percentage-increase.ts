import { createFormula } from "./createFormula";

export const percentageIncreaseFormula = createFormula({
  title: "Percentage Increase Formula",

  formula:
    "Percentage Increase = ((New Value − Original Value) ÷ Original Value) × 100",

  explanation:
    "Percentage increase measures how much a value has increased compared to its original value.",

  steps: [
    {
      title: "Step 1",
      content: "Subtract the original value from the new value.",
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