export enum ScreenState {
  WELCOME,
  DASHBOARD,
  LESSON,
  SUCCESS,
}

export interface UserProgress {
  level: number;
  streak: number;
  xp: number;
  lastLessonDate: string;
}

export interface LessonContent {
  id: string;
  topic: string; // e.g., "Variables", "Functions"
  intro: string; // Gentle explanation
  question: string; // The coding challenge description
  codeTemplate: string; // The code with a blank
  correctAnswer: string;
  options: string[]; // Choices for the blank (mobile friendly)
  explanation: string; // Why this is the answer
}

export interface AIExplanation {
  isCorrect: boolean;
  message: string; // Gentle feedback
  encouragement: string;
}