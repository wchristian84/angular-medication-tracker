import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Medication } from "src/app/medications/medications.model";
import { MedicationsService } from "src/app/medications/medications.service";
import { UserData } from "../auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  userData: UserData = JSON.parse(localStorage.getItem('userData') as string);
  firebaseDatabaseURL = 'https://angular-medication-tracker-default-rtdb.firebaseio.com/medications/';

  constructor(private http: HttpClient, private medicationsService: MedicationsService) {}

  fetchCurrentFromFirebase() {
    return this.http.get<Medication[]>(`${this.firebaseDatabaseURL}${this.userData.id}/currentMeds.json`, {})
    .subscribe(meds => {
      if (meds === null) {
        this.medicationsService.currentMeds = [];
      }
      else {
        this.medicationsService.updateCurrentArray(meds);
        console.log('response from DB: ', meds);
      }
    });
  }

  fetchPastFromFirebase() {
    return this.http.get<Medication[]>(`${this.firebaseDatabaseURL}${this.userData.id}/pastMeds.json`, {})
      .subscribe(meds => {
        if (meds === null) {
          this.medicationsService.pastMeds = [];
        }
        else {
          this.medicationsService.updatePastArray(meds);
          console.log('response from DB: ', meds);
        }
      });
  }

  saveMedsToFirebase(currentMeds: Medication[], pastMeds: Medication[]) {
    const userData: UserData = JSON.parse(localStorage.getItem('userData') as string);
    const thisUser = userData.id;
    const meds = {
        "currentMeds": currentMeds,
        "pastMeds": pastMeds,
    }

    this.http.patch(this.firebaseDatabaseURL, meds).subscribe(res => {
      console.log("Firebase DB Response:", res);
    });
  }

}
