import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { MedicationsService } from 'src/app/medications/medications.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  authObsrv: Observable<AuthResponseData> | undefined;
  errMessage = null;

  constructor(private authService: AuthService, private router: Router, private medicationService: MedicationsService) { }

  ngOnInit(): void {
    this.authService.automaticSignIn();
  }

  onAuthFormSubmit(formObj: NgForm) {
    if (!formObj.valid) return;

    const { email, password, firstName, lastName } = formObj.value;

    if (this.isLoginMode) {
        this.authObsrv = this.authService.signIn(email, password);
      } else {
        this.authObsrv = this.authService.signUp(email, password, firstName, lastName);
      }

      this.authObsrv.subscribe(
        (res) => {
          if (this.errMessage) this.errMessage = null;

          // Reroute to /current-meds on success
          if(res.success){
            this.medicationService.updateMedications(res.payload.user.id);
            this.router.navigate(['current-meds']);
          }
        },
        (err) => {
          console.error("Auth Response Error: ", err);
          this.errMessage = err.message;
        }
      );

    formObj.reset();


  }

  onSwitchAuthMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
