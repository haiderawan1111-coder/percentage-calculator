export interface FormulaStep {
  title?: string;
  content: string;
}

export interface FormulaSection {
  title?: string;
  formula: string;
  explanation?: string;
  steps?: FormulaStep[];
}