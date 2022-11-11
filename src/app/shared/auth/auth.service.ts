import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators"
import { environment } from "src/environments/environment";

import { User } from "./user.model";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export interface UserData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = new BehaviorSubject<User|null>(null);
  userToken = null;
  private tokenExpTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  automaticSignIn() {
    const userData: UserData = JSON.parse(localStorage.getItem('userData') as string);
    console.log(userData);

    if (!userData) return;
    const { email, id, _token, _tokenExpirationDate } = userData;

    const loadedUser = new User (
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.currentUser.next(loadedUser);
      this.router.navigate(['current-meds'])
    }
  }

  automaticSignOut(expDuration: number) {
    console.log('Expiration Duration: ', expDuration);

    this.tokenExpTimer = setTimeout(() => {
      this.signOut();
    }, expDuration);
  }

  handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    // Set expiration for token
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    //  Take in form info and create a new user based on it
    const formUser = new User(email, userId, token, expDate);
    // Set new expiration timer for token
    this.automaticSignOut(expiresIn * 1000);
    // Emit new user
    this.currentUser.next(formUser);
    // Save user in local storage
    localStorage.setItem('userData', JSON.stringify(formUser));
  }

  signIn(email: string, password: string) {
    // Make post request to backend
    return this.http.post<AuthResponseData>(
      environment.loginUrl + environment.authAPIKey,
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

  signOut() {
    this.currentUser.next(null);

    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }

    this.router.navigate(['auth']);
  }

  signUp(email: string, password: string) {
    // Make post request to backend
    return this.http.post<AuthResponseData>(environment.signupUrl + environment.authAPIKey, {
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
