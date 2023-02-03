import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authObsrv: Observable<AuthResponseData> | undefined;
  errMessage = null;

  constructor(private authService: AuthService, private router: Router, private http: HttpService) { }

  ngOnInit(): void {
    this.authService.automaticSignIn();
  }

  onAuthFormSubmit(formObj: NgForm) {
    if (!formObj.valid) return;

    const { email, password } = formObj.value;

    if (this.isLoginMode) {
        this.authObsrv = this.authService.signIn(email, password);
      } else {
        this.authObsrv = this.authService.signUp(email, password);
      }

      this.authObsrv.subscribe(
        (res) => {
          console.log('Auth Response Success: ', res);
          if (this.errMessage) this.errMessage = null;

          // Reroute to /current-meds on success
          // this.router.navigate(['current-meds']);
        },
        (err) => {
          console.error("Auth Response Error: ", err);
          this.errMessage = err.message;
        }
      );
    // Reroute to /current-meds on success
    this.router.navigate(['current-meds']);
    formObj.reset();


  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
