import { Injectable, inject } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, skip, switchMap, take, tap } from "rxjs/operators";
import { quizFeature } from "./app.feature";
import { changeLanguage, systemActions } from "./app.actions";
import { QuizState } from "./app.state";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,  // NgRx Actions stream
    private translateService: TranslateService  // ngx-translate service
  ) {}

  saveToStorage = createEffect(() => inject(Store)
  .select(quizFeature.selectQuizState)
  .pipe(
      skip(1), 
      tap(state => localStorage.setItem(quizFeature.name, JSON.stringify(state)))
  ), {
      functional: true, dispatch: false
  }    
)

loadFromStorage = createEffect(() => inject(Actions).pipe(
  ofType(ROOT_EFFECTS_INIT), 
  take(1), 
  switchMap((_) => {
    var newState = JSON.parse(localStorage.getItem(quizFeature.name)!) as QuizState

    const storedLanguage = newState?.language || localStorage.getItem('language') || 'he';

    return of(systemActions.resetState({state:newState }) , changeLanguage({ language: storedLanguage }))
})
), {
  functional: true
});


  // Effect to handle language change
  changeLanguage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(changeLanguage),  // Listen for the changeLanguage action
      tap(action => {
        console.log(`changing language to ${action.language}`)
        // Perform the language switch by updating the TranslateService
        this.translateService.use(action.language);
      })
    ),
    { dispatch: false }  // We don't dispatch another action after this effect
  );
}