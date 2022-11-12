import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

import { Medication } from "src/app/medications/medications.model";
import { MedicationsService } from "src/app/medications/medications.service";
import { UserData } from "../auth/auth.service";


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  userData: UserData = JSON.parse(localStorage.getItem('userData') as string);
  firebaseDatabaseURL = 'https://angular-medication-tracker-default-rtdb.firebaseio.com/medications/' + `${this.userData.id}.json`;

  constructor(private http: HttpClient, private medicationsService: MedicationsService) {}

  fetchCurrentFromFirebase() {
    return this.http.get<Medication[]>(this.firebaseDatabaseURL, {}).pipe(
      tap(meds => {
        this.medicationsService.updateCurrentArray(meds);
        console.log('response object: ', meds);
      })
    );
  }

  fetchPastFromFirebase() {
    return this.http.get<Medication[]>(this.firebaseDatabaseURL, {}).pipe(
      tap(meds => {
        this.medicationsService.updatePastArray(meds);
      })
    );
  }

  saveMedsToFirebase(currentMeds: Medication[], pastMeds: Medication[]) {
    const userData: UserData = JSON.parse(localStorage.getItem('userData') as string);
    const thisUser = userData.id;
    const meds = {
        "currentMeds": currentMeds,
        "pastMeds": pastMeds
    }

    this.http.put(this.firebaseDatabaseURL, meds).subscribe(res => {
      console.log("Firebase DB Response:", res);
    });
  }

  savePastMedsToFirebase(meds: Medication[]) {
    const past: Medication[] = meds;

    this.http.put(this.firebaseDatabaseURL, past).subscribe(res => {
      console.log("Firebase DB Response:", res);
    });
  }

}
