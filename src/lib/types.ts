export type QuizCategory = "personality" | "attachment" | "values" | "love";

export interface QuizQuestion {
  id: string;
  category: QuizCategory;
  text: string;
  // Options are typically on a Likert scale, e.g., 1-5
  options: { text: string; value: number }[];
}

export interface QuizAnswers {
  [questionId: string]: number;
}
