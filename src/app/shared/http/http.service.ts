import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Medication } from "src/app/medications/medications.model";
import { MedicationsService } from "src/app/medications/medications.service";
import { UserData } from "../auth/auth.service";
import { environment } from "src/environments/environment";

export interface ResponseData{
  success: boolean,
  payload: MedicationResponseData[]
}

export interface MedicationResponseData{
  id: number,
  name: string,
  dosage: string | null,
  frequency: string | null,
  date: number | null,
  day: string | null,
  benefits: string | null,
  side_effects: string | null,
  start_date: string | null,
  stop_date: string | null,
  reason_stopped: string | null,
  is_current: boolean,
  created_at: string,
  updated_at: string,
  morning: boolean | null,
  midday: boolean | null,
  evening: boolean | null,
  night: boolean | null,
  user_id: number
}

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
    return this.http.get<ResponseData>(`${this.databaseURL}get/`, {})
    .pipe(tap((res) => {
      if (res.payload === null) {
        this.medicationsService.medications = [];
      }
      else {
        for (let med of res.payload) {
          let restructuredMed = new Medication(
            med.id,
            med.name,
            med.is_current,
            med.dosage,
            med.frequency,
            med.date,
            med.day,
            med.morning,
            med.midday,
            med.evening,
            med.night,
            med.benefits,
            med.side_effects,
            med.start_date,
            med.stop_date,
            med.reason_stopped,
          )
          this.medicationsService.medications.push(restructuredMed);
        }
        console.log('response from DB: ', res);
      }
    }));
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
