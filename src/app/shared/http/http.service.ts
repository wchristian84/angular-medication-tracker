import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Medication } from "src/app/medications/medications.model";
import { MedicationsService } from "src/app/medications/medications.service";
import { AuthService, UserData } from "../auth/auth.service";
import { environment } from "src/environments/environment";
import { User } from "../auth/user.model";
import { Subscription } from "rxjs";

export interface ResponseData{
  success: boolean,
  payload: Medication[]
}

export interface DeleteResponse{
  success: boolean,
  payload: any
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  databaseURL = `${environment.apiRoute}medications/`;
  currentUserSub = new Subscription;
  currentUser!: User;

  constructor(private http: HttpClient, private authService: AuthService) {}

  deleteFromDatabase(med_id: number) {
    this.currentUserSub = this.authService.currentUser.subscribe(res => {
      if (res != null) {
        this.currentUser = res;
      }
    });
    let body = {
      med_id: med_id,
      user_id: this.currentUser.id
    };
    return this.http.delete<DeleteResponse>(`${this.databaseURL}delete`, {body: body});
  }

  fetchMedsFromDatabase() {
    this.currentUserSub = this.authService.currentUser.subscribe(res => {
      if (res != null) {
        this.currentUser = res;
      }
    });
    return this.http.get<ResponseData>(`${this.databaseURL}meds`, {params: {user_id: this.currentUser.id}});
  }

  saveEditsToDatabase(editedMed: Medication) {
    this.currentUserSub = this.authService.currentUser.subscribe(res => {
      if (res != null) {
        this.currentUser = res;
      }
    });
    let body = {
      id: editedMed.id,
      name: editedMed.name,
      dosage: editedMed.dosage,
      frequency: editedMed.frequency,
      date: editedMed.date,
      day: editedMed.day,
      benefits: editedMed.benefits,
      side_effects: editedMed.side_effects,
      start_date: editedMed.start_date,
      stop_date: editedMed.stop_date,
      reason_stopped: editedMed.reason_stopped,
      is_current: editedMed.is_current,
      morning: editedMed.morning,
      midday: editedMed.midday,
      evening: editedMed.evening,
      night: editedMed.night,
      user_id: this.currentUser.id
    };
    return this.http.patch<ResponseData>(`${this.databaseURL}edit/`, body);
  }

  saveNewToDatabase(newMed: Medication) {
    this.currentUserSub = this.authService.currentUser.subscribe(res => {
      if (res != null) {
        this.currentUser = res;
      }
    });
    newMed.user_id = this.currentUser.id;
    return this.http.post<ResponseData>(`${this.databaseURL}new/`, newMed);
  }

}
