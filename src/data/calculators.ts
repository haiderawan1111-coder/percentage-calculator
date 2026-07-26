export interface CalculatorItem {
  title: string;
  description: string;
  href: string;

  slug: string;
  category: string;
  keywords: readonly string[];
}

export const calculators: readonly CalculatorItem[] = [
  {
    title: "Percentage Change Calculator",
    description: "Calculate percentage increase or decrease between two values.",
    href: "/percentage-change",

    slug: "percentage-change",
    category: "percentage",
    keywords: [
      "percentage",
      "change",
      "increase",
      "decrease",
    ],
  },
  {
    title: "Percentage Increase Calculator",
    description: "Calculate the percentage increase from one value to another.",
    href: "/percentage-increase",

    slug: "percentage-increase",
    category: "percentage",
    keywords: [
      "percentage",
      "increase",
      "growth",
      "gain",
    ],
  },
  {
    title: "Percentage Decrease Calculator",
    description: "Calculate the percentage decrease quickly and accurately.",
    href: "/percentage-decrease",

    slug: "percentage-decrease",
    category: "percentage",
    keywords: [
      "percentage",
      "decrease",
      "reduction",
      "loss",
    ],
  },
  {
    title: "Percentage Error Calculator",
    description: "Find percentage error using actual and measured values.",
    href: "/percentage-error",

    slug: "percentage-error",
    category: "percentage",
    keywords: [
      "percentage",
      "error",
      "accuracy",
      "measurement",
    ],
  },
  {
    title: "Percentage Increase/Decrease Calculator",
    description: "Determine whether a value increased or decreased.",
    href: "/percentage-increase-decrease",

    slug: "percentage-increase-decrease",
    category: "percentage",
    keywords: [
      "percentage",
      "increase",
      "decrease",
      "change",
    ],
  },
] as const;