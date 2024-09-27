import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


 interface AuthResponseData{
    readonly idToken:string;
    readonly email:string;
    readonly refreshToken:string;
    readonly expiresIn:string;
    readonly localId:string;
}


@Injectable({providedIn:'root'})
export class AuthService{
constructor(private http:HttpClient){}

public SignUp(email:string , password:string){
    console.log('Auth service Signing Up');
    return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBRb9K8NL1TsgCJ3lYJrx_Tn9AyCFxCDq4`,
        {
            email:email,
            password:password,
            returnSecureToken:true
        }
    );
}


public Login(email:string , password:string){
    console.log('Auth service Signing Up');
    return this.http.post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBRb9K8NL1TsgCJ3lYJrx_Tn9AyCFxCDq4`,
        {
            email:email,
            password:password,
        }
    );
}

}