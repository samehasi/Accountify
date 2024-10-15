import { Injectable, inject } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, skip, switchMap, take, tap } from "rxjs/operators";
import { quizFeature } from "./app.feature";
import { changeLanguage, signInError, signInRequest, signInSuccess, signUp, systemActions } from "./app.actions";
import { State } from "./app.state";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { AuthService } from "../Services/auth.service";

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,  // NgRx Actions stream
    private translateService: TranslateService,  // ngx-translate service
    private authService: AuthService
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
    var newState = JSON.parse(localStorage.getItem(quizFeature.name)!) as State

    const storedLanguage = newState?.language || localStorage.getItem('language') || 'he';

    return of(changeLanguage({ language: storedLanguage }))
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

  signUpEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(signUp),  // Listen for the changeLanguage action
    switchMap(action => {
      console.log(`Signing Up email ${action.email}`)
      // Perform the language switch by updating the TranslateService
      return this.authService.SignUp(action.email,action.password);
    })
  ),
  { dispatch: false }  // We don't dispatch another action after this effect
);

signInEffect$ = createEffect(() =>
this.actions$.pipe(
  ofType(signInRequest),  // Listen for the changeLanguage action
  switchMap(action => {
    console.log(`Signing Up email ${action.email}`)
    // Perform the language switch by updating the TranslateService
    return this.authService.Login(action.email,action.password).pipe(
      switchMap(res => {
        console.log(JSON.stringify(res));
        return [signInSuccess({token:"",timeout:new Date()})];
      }),
      catchError(e =>
        {
          console.log(` printing error ${JSON.stringify(e)}`);
           return  [signInError({error:''})];
        })
    );
  }),

),
);
}