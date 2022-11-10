import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { Medication } from "src/app/medications/medications.model";

import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  firebaseRootURL = 'https://angular-medication-tracker-default-rtdb.firebaseio.com/meds.json'

  constructor(private http: HttpClient, private authService: AuthService) {}

  fetchCurrentFromFirebase() {
    return this.http
    .get(this.firebaseRootURL, {})
    .subscribe((res) => {
      console.log(res);
    });
  }

  saveCurrentMedsToFirebase(meds: Medication[]) {
    const current: Medication[] = meds;

    this.http.put(this.firebaseRootURL, current).subscribe(res => {
      console.log("Firebase DB Response:", res);
    });
  }

  savePastMedsToFirebase(meds: Medication[]) {
    const past: Medication[] = meds;

    this.http.put(this.firebaseRootURL, past).subscribe(res => {
      console.log("Firebase DB Response:", res);
    });
  }

}
