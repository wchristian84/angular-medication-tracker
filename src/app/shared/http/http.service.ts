import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Medication } from "src/app/medications/medications.model";
import { MedicationsService } from "src/app/medications/medications.service";
import { UserData } from "../auth/auth.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  databaseURL = `${environment.apiRoute}medications/`;

  constructor(private http: HttpClient, private medicationsService: MedicationsService) {}

  fetchMedsFromDatabase() {
    return this.http.get<Medication[]>(`${this.databaseURL}my_meds/`, {})
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

  saveMedsToFirebase(currentMeds: Medication[], pastMeds: Medication[]) {
    const userData: UserData = JSON.parse(localStorage.getItem('userData') as string);
    const thisUser = userData.id;
    const meds = {
        "currentMeds": currentMeds,
        "pastMeds": pastMeds,
    }

    this.http.patch(`${this.databaseURL}edit/`, meds).subscribe(res => {
      console.log("DB Response:", res);
    });
  }

}
