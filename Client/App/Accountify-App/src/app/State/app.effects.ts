import { Injectable, inject } from "@angular/core";
import { Actions, ROOT_EFFECTS_INIT, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, map, skip, switchMap, take, tap } from "rxjs/operators";
import { quizFeature } from "./app.feature";
import { changeLanguage, signInError, signInRequest, signInSuccess, signOut, signUp, systemActions } from "./app.actions";
import { State } from "./app.state";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { AuthService } from "../Services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AppEffects {

  constructor(
    private actions$: Actions,  // NgRx Actions stream
    private translateService: TranslateService,  // ngx-translate service
    private authService: AuthService,
    private router:Router
  ) {}

  saveToStorage = createEffect(() => inject(Store)
  .select(quizFeature.selectQuizState)
  .pipe(
      skip(1), 
      tap(state => localStorage.setItem('lang', JSON.stringify(state.language)))
  ), {
      functional: true, dispatch: false
  }    
)

loadFromStorage = createEffect(() => inject(Actions).pipe(
  ofType(ROOT_EFFECTS_INIT), 
  take(1), 
  switchMap((_) => {
    const storedLang = JSON.parse(localStorage.getItem('lang')!) as string ?? 'en'
    const storedToken =  JSON.parse(localStorage.getItem('token')!) as string
    const storedTTimeout =  JSON.parse(localStorage.getItem('timeout')!) as string

    let actions = [];

    if(storedToken !== null && storedTTimeout !== null)
    {
    actions.push(signInSuccess({ token: storedToken , timeout:new Date(storedTTimeout) }));

    }
    actions.push(changeLanguage({ language: 'en' }));


    return actions;



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
        localStorage.setItem('token', JSON.stringify("koko"));
        localStorage.setItem('timeout', JSON.stringify(new Date()));
        this.router.navigate(['/']);
        return [signInSuccess({token:"koko",timeout:new Date()})];
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

signOutEffect$ = createEffect(() =>
this.actions$.pipe(
  ofType(signOut),  // Listen for the changeLanguage action
    tap(state => {
    localStorage.removeItem('token');
    localStorage.removeItem('timeout')
  })
),
{ dispatch: false }  // We don't dispatch another action after this effect
);


}