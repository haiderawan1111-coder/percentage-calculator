import { createFormula } from "./createFormula";

export const percentageErrorFormula = createFormula({
  title: "Percentage Error Formula",

  formula:
    "Percentage Error = (|Experimental Value − Actual Value| ÷ |Actual Value|) × 100",

  explanation:
    "Percentage error measures how far an experimental value differs from the accepted or actual value, expressed as a percentage.",

  steps: [
    {
      title: "Step 1",
      content:
        "Subtract the actual value from the experimental value and take the absolute value.",
    },
    {
      title: "Step 2",
      content:
        "Divide the result by the absolute value of the actual value.",
    },
    {
      title: "Step 3",
      content:
        "Multiply the result by 100 to convert it into a percentage.",
    },
  ],
});