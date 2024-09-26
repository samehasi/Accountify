import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/App/app.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent,},
    { path: '', component: HomeComponent }, // Default route
];
