import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators"

import { User } from "./user.model";

const authAPIKey: string = 'AIzaSyAnL6ZZ-hd6CfoZwF3TOveLUukhhuW5-4c';
const signupUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
const loginUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject<User|null>(null);
  userToken = null;

  constructor(private http: HttpClient) {}

  handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    // Set expiration for token
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    //  Take in form info and create a new user based on it
    const formUser = new User(email, userId, token, expDate);
    // Emit new user
    this.currentUser.next(formUser);
    // Save user in local storage
    localStorage.setItem('userData', JSON.stringify(formUser));
  }

  signIn(email: string, password: string) {
    // Make post request to backend
    return this.http.post<AuthResponseData>(
      loginUrl + authAPIKey,
      {
        // Pass sign in data as object
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(
      tap((response) => {
        // Destructure to access all response values
        const { email, localId, idToken, expiresIn } = response;
        // Pass response values to handleAuth method
        this.handleAuth(email, localId, idToken, +expiresIn)
        }
      )
    );
  }

  signUp(email: string, password: string) {
    // Make post request to backend
    return this.http.post<AuthResponseData>(signupUrl + authAPIKey, {
      // Pass registration data as object
      email,
      password,
      returnSecureToken: true
    }).pipe(
      tap((response) => {
        // Destructure to access all response values
        const { email, localId, idToken, expiresIn } = response;
        // Pass response values to handleAuth method
        this.handleAuth(email, localId, idToken, +expiresIn)
        }
      )
    );
  }
}
