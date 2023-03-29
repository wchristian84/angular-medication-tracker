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

  deleteFromDatabase(id: number) {

  }

  fetchMedsFromDatabase() {
    return this.http.get<Medication[]>(`${this.databaseURL}get/`, {})
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

  saveEditsToDatabase(editedMed: Medication) {
    this.http.patch(`${this.databaseURL}edit/`, editedMed).subscribe(res => {
      console.log("DB Response:", res);
    });
  }

  saveNewToDatabase(newMed: Medication) {
    this.http.put(`${this.databaseURL}new/`, newMed).subscribe(res => {
      console.log("DB Response:", res);
    });
  }

}
