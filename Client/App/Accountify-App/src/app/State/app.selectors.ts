import { createFeatureSelector, createSelector } from "@ngrx/store";
import { QuizState } from "./app.state";

export const selectLanguageFeature = createFeatureSelector<QuizState>('quiz');

export const selectCurrentLanguage = createSelector(
  selectLanguageFeature,
  (state: QuizState) => state.language
);