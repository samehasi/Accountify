
export interface QuizState {
    answers: any;
    language: string
}

export const QUIZ_INITIAL_STATE: QuizState = {
    answers: undefined,
    language: 'en'  // Default language
}