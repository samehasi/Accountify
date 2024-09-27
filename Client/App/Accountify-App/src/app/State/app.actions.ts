import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { QuizState } from "./app.state";

export const userQuizActions  = createActionGroup({
    source: 'User Quiz', 
    events: {
        'reset': emptyProps(), 
        'answer current question': props<{index: number}>()
    }
})

export const systemActions = createActionGroup({
    source: 'System', 
    events: {
        'reset state': props<{state: QuizState}>()
    }
})


export const changeLanguage = createAction(
    '[Language] Change Language',
    props<{ language: string }>()  // The language to switch to
  );

  export const signUp = createAction(
    '[Auth] Sign Up',
    props<{ email: string , password: string }>()  // The language to switch to
  );

  export const signIn = createAction(
    '[Auth] Sign In',
    props<{ email: string , password: string }>()  // The language to switch to
  );