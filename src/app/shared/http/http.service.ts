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
  user: UserData = JSON.parse(localStorage.getItem('userData') as string);

  constructor(private http: HttpClient, private medicationsService: MedicationsService) {}

  deleteFromDatabase(med_id: number) {
    let body = {
      med_id: med_id,
      user_id: this.user.id
    };
    this.http.delete(`${this.databaseURL}delete`, {body: body}).subscribe(res => {
      console.log("delete response: ", res)
    });
  }

  fetchMedsFromDatabase() {
    return this.http.get<Medication[]>(`${this.databaseURL}get/`, {})
    .subscribe(meds => {
      if (meds === null) {
        this.medicationsService.medications = [];
      }
      else {
        this.medicationsService.medications = meds;
        console.log('response from DB: ', meds);
      }
    });
  }

  saveEditsToDatabase(editedMed: Medication) {
    let body = {
      id: editedMed.id,
      name: editedMed.name,
      dosage: editedMed.dosage,
      frequency: editedMed.frequency,
      date: editedMed.date,
      day: editedMed.day,
      benefits: editedMed.benefits,
      side_effects: editedMed.sideEffects,
      start_date: editedMed.startDate,
      stop_date: editedMed.stopDate,
      reason_stopped: editedMed.reasonStopped,
      is_current: editedMed.isCurrent,
      morning: editedMed.morning,
      midday: editedMed.midday,
      evening: editedMed.evening,
      night: editedMed.night,
      user_id: this.user.id
    };
    this.http.patch(`${this.databaseURL}edit/`, body).subscribe(res => {
      console.log("DB Response:", res);
    });
  }

  saveNewToDatabase(newMed: Medication) {
    let body = {
      id: newMed.id,
      name: newMed.name,
      dosage: newMed.dosage,
      frequency: newMed.frequency,
      date: newMed.date,
      day: newMed.day,
      benefits: newMed.benefits,
      side_effects: newMed.sideEffects,
      start_date: newMed.startDate,
      stop_date: newMed.stopDate,
      reason_stopped: newMed.reasonStopped,
      is_current: newMed.isCurrent,
      morning: newMed.morning,
      midday: newMed.midday,
      evening: newMed.evening,
      night: newMed.night,
      user_id: this.user.id
    };
    this.http.put(`${this.databaseURL}new/`, body).subscribe(res => {
      console.log("DB Response:", res);
    });
  }

}
