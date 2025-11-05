export enum Feature {
  SUMMARY = 'Summarizer',
  CONCEPTS = 'Key Concepts',
  QA = 'Q&A Generator',
}

export interface KeyConcept {
  concept: string;
  explanation: string;
}

export interface QuestionAnswer {
  question: string;
  answer: string;
}
