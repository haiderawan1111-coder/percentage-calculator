export interface CalculatorItem {
  title: string;
  description: string;
  href: string;
}

export const calculators: CalculatorItem[] = [
  {
    title: "Percentage Change Calculator",
    description: "Calculate percentage increase or decrease between two values.",
    href: "/percentage-change",
  },
  {
    title: "Percentage Increase Calculator",
    description: "Calculate the percentage increase from one value to another.",
    href: "/percentage-increase",
  },
  {
    title: "Percentage Decrease Calculator",
    description: "Calculate the percentage decrease quickly and accurately.",
    href: "/percentage-decrease",
  },
  {
    title: "Percentage Error Calculator",
    description: "Find percentage error using actual and measured values.",
    href: "/percentage-error",
  },
  {
    title: "Percentage Increase/Decrease Calculator",
    description: "Determine whether a value increased or decreased.",
    href: "/percentage-increase-decrease",
  },
];