import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  errMessage = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onAuthFormSubmit(formObj: NgForm) {
    if (!formObj.valid) return;

    const { email, password } = formObj.value;

    if (this.isLoginMode) {
      this.authService.signIn(email, password).subscribe((response) => {
        console.log('Auth Login Response: ', response);
        if (this.errMessage) {this.errMessage = null;}

        // Reroute to /current-meds on success
        this.router.navigate(['current-meds']);
      },
      (err) => {
        console.error('Auth Response Error: ', err);
        this.errMessage = err.message;
        }
      );
    } else {
      this.authService.signUp(email, password).subscribe((response) => {
        console.log('Auth Response Success: ', response);
        if (this.errMessage) {this.errMessage = null;}
      },
      (err) => {
        console.error('Auth Response Error: ', err);
        this.errMessage = err.message;
        }
      );
    }

    formObj.reset();

  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
