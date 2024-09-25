import { createReducer, on } from '@ngrx/store';
import { QUIZ_INITIAL_STATE, QuizState } from './app.state';
import { systemActions, userQuizActions } from './app.actions';

export const quizReducer = createReducer(
  QUIZ_INITIAL_STATE,
  on(userQuizActions.reset, () => QUIZ_INITIAL_STATE),
  on(userQuizActions.answerCurrentQuestion, (state, action) => ({
    ...state,
    answers: [
      ...state.answers,
      {
        userAnswer: action.index,
       // isCorrect: currentQuestion(state).correctAnswer === action.index,
      },
    ],
  })), 
  on(systemActions.resetState, (_, action) => action.state)

);
function currentQuestion(state: QuizState) {
    throw new Error('Function not implemented.');
}

