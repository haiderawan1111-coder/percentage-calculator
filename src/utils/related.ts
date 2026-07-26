import { calculators, type CalculatorItem } from "../data/calculators";

export function getRelatedCalculators(
  currentSlug: string,
  limit = 4,
): CalculatorItem[] {
  const current = calculators.find(
    (calculator) => calculator.slug === currentSlug,
  );

  if (!current) {
    return [];
  }

  return [...calculators]
    .filter((calculator) => calculator.slug !== currentSlug)
    .map((calculator) => {
      let score = 0;

      if (calculator.category === current.category) {
        score += 10;
      }

      const sharedKeywords = calculator.keywords.filter((keyword) =>
        current.keywords.includes(keyword),
      ).length;

      score += sharedKeywords;

      return {
        calculator,
        score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ calculator }) => calculator);
}