export interface ContentSection {
  title: string;
  body: string[];
}

export interface WorkedExample {
  title: string;
  steps: string[];
  result: string;
}

export interface CalculatorContent {
  howItWorks: ContentSection;
  example: WorkedExample;
  commonMistakes: ContentSection;
  tips: ContentSection;
}