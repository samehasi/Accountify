import { inject } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, skip, take, tap } from "rxjs/operators";
import { quizFeature } from "./app.feature";
import { systemActions } from "./app.actions";
import { QuizState } from "./app.state";

export const saveToStorage = createEffect(() => inject(Store)
    .select(quizFeature.selectQuizState)
    .pipe(
        skip(1), 
        tap(state => localStorage.setItem(quizFeature.name, JSON.stringify(state)))
    ), {
        functional: true, dispatch: false
    }    
)

export const loadFromStorage = createEffect(() => inject(Actions).pipe(
    ofType(ROOT_EFFECTS_INIT), 
    take(1), 
    map((_) => systemActions.resetState({
        state: JSON.parse(
            localStorage.getItem(quizFeature.name)!) as QuizState }))
), {
    functional: true
});