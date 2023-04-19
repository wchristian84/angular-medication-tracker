import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

import { User } from "./user.model";
import { MedicationsService } from "src/app/medications/medications.service";

export interface AuthResponseData {
  success: boolean;
  payload: {
    user: {
      id: number;
      email: string;
      first_name: string;
      last_name: string;
      name: string;
      token: {
        id: number;
        created_at: string;
        expiry: string;
        ip: string;
        revocation_date: string;
        updated_at: string;
        user_id: number;
        value: string;
      };
    };
  };
}

export interface UserData {
  email: string;
  id: number;
  firstName: string;
  lastName: string;
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

  constructor(private http: HttpClient, private router: Router, private medicationService: MedicationsService) {}

  automaticSignIn() {
    const storedUser = localStorage.getItem('userData');
    // Check for locally saved user data
    if (!storedUser) {
      return;
    } else {
      const userData: UserData = JSON.parse(storedUser as string);
      console.log(userData);
      const { email, id, firstName, lastName, _token, _tokenExpirationDate } = userData;
      // If exists, set saved data to variables, add new token expiry
      const loadedUser = new User (
        email,
        id,
        firstName,
        lastName,
        _token,
        new Date(_tokenExpirationDate)
      );
      // Emit user and redirect to current meds view
      if (loadedUser.token) {
        this.currentUser.next(loadedUser);
        this.medicationService.updateMedications();
        this.router.navigate(['current-meds']);
      }
    }
  }

  automaticSignOut(expDuration: number) {
    console.log('Expiration Duration: ', expDuration);
    // Set timeout duration and call logout function when expired
    this.tokenExpTimer = setTimeout(() => {
      this.signOut();
    }, expDuration);
  }

  handleAuth(email: string, userId: number, first: string, last: string, token: string, expiresIn: number) {
    // Set expiration for token
    const expDate = new Date(new Date().getTime() + expiresIn * 1000);
    //  Take in form info and create a new user based on it
    const formUser = new User(email, userId, first, last, token, expDate);
    // Set new expiration timer for token
    this.automaticSignOut(expiresIn);
    // Emit new user
    this.currentUser.next(formUser);
    // Save user in local storage
    localStorage.setItem('userData', JSON.stringify(formUser));
    console.log("userData:", localStorage.getItem('userData'));
  }

  signIn(email: string, password: string) {
    // Make post request to backend
    return this.http.post<AuthResponseData>(
      `${environment.apiRoute}users/login`,
      {
        // Pass sign in data as object
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(
      tap((response) => {
        // Destructure to access all response values
        const { success, payload } = response;
        console.log("response: ", response);
        // Calculate time until expiration
        let expiresAt = new Date(response.payload.user.token.expiry).getTime();
        console.log("expiresAt: ", expiresAt);
        let now = new Date(response.payload.user.token.created_at).getTime();
        console.log("now: ", now);
        let expiresIn = +expiresAt - +now;
        console.log("expiresIn: ", expiresIn);
        // Pass response values to handleAuth method
        this.handleAuth(email, payload.user.id, payload.user.first_name, payload.user.last_name, payload.user.token.value, +expiresIn);
        }
      )
    );
  }

  signOut() {
    // Emit user as null
    this.currentUser.next(null);
    // Clear user from local storage
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      // Clear any remaining time on token expiration timer
      clearTimeout(this.tokenExpTimer);
    }
    // Navigate back to auth form
    this.router.navigate(['auth']);
  }

  signUp(email: string, password: string, firstName: string, lastName: string) {
    // Make post request to backend
    return this.http.post<AuthResponseData>(`${environment.apiRoute}users/create`, {
      // Pass registration data as object
      email: email,
      password: password,
      first_name: firstName,
      last_name: lastName,
      returnSecureToken: true
    }).pipe(
      tap((response) => {
        // Destructure to access all response values
        const { success, payload } = response;
        // Calculate time until expiration
        let expiresAt = new Date(response.payload.user.token.revocation_date).getTime
        let now = new Date(response.payload.user.token.created_at).getTime
        let expiresIn = +expiresAt - +now
        // Pass response values to handleAuth method
        this.handleAuth(payload.user.email, payload.user.id, payload.user.first_name, payload.user.last_name, payload.user.token.value, +expiresIn)
        }
      )
    );
  }
}
