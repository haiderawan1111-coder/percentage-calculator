import { createFormula } from "./createFormula";

export const percentageIncreaseDecreaseFormula = createFormula({
  title: "Percentage Increase/Decrease Formula",

  formula:
    "New Value = Original Value × (1 ± Percentage ÷ 100)",

  explanation:
    "Use the plus (+) sign to increase a value by a percentage and the minus (−) sign to decrease a value by a percentage.",

  steps: [
    {
      title: "Step 1",
      content: "Convert the percentage into its decimal equivalent by dividing it by 100.",
    },
    {
      title: "Step 2",
      content: "Add the decimal to 1 for an increase, or subtract it from 1 for a decrease.",
    },
    {
      title: "Step 3",
      content: "Multiply the original value by the result to get the new value.",
    },
  ],
});