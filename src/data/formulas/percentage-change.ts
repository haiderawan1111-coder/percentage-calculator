import { createFormula } from "./createFormula";

export const percentageChangeFormula = createFormula({
  title: "Percentage Change Formula",

  formula:
    "Percentage Change = ((New Value − Original Value) ÷ Original Value) × 100",

  explanation:
    "Percentage change compares a new value with the original value and expresses the difference as a percentage.",

  steps: [
    {
      title: "Step 1",
      content:
        "Subtract the original value from the new value.",
    },
    {
      title: "Step 2",
      content:
        "Divide the difference by the original value.",
    },
    {
      title: "Step 3",
      content:
        "Multiply the result by 100 to convert it into a percentage.",
    },
  ],
});