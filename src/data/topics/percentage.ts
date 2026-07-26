import { createTopic } from "./createTopic";

export const percentageTopic = createTopic({
  id: "percentage",

  title: "Percentage Calculators",

  description:
    "Explore more percentage calculators including percentage change, percentage increase, percentage decrease, percentage increase/decrease, and percentage error calculations.",

  calculators: [
    {
      title: "Percentage Calculator",
      slug: "/",
    },
    {
      title: "Percentage Change Calculator",
      slug: "/percentage-change",
    },
    {
      title: "Percentage Increase Calculator",
      slug: "/percentage-increase",
    },
    {
      title: "Percentage Decrease Calculator",
      slug: "/percentage-decrease",
    },
    {
      title: "Percentage Increase/Decrease Calculator",
      slug: "/percentage-increase-decrease",
    },
    {
      title: "Percentage Error Calculator",
      slug: "/percentage-error",
    },
  ],
});