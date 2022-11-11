import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Medication } from "src/app/medications/medications.model";
import { MedicationsService } from "src/app/medications/medications.service";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  firebaseCurrentURL = 'https://angular-medication-tracker-default-rtdb.firebaseio.com/current-meds.json'
  firebasePastURL = 'https://angular-medication-tracker-default-rtdb.firebaseio.com/past-meds.json'

  constructor(private http: HttpClient, private medicationsService: MedicationsService) {}

  fetchCurrentFromFirebase() {
    return this.http.get<Medication[]>(this.firebaseCurrentURL, {}).pipe(
      tap(meds => {
        this.medicationsService.updateCurrentArray(meds);
      })
    );
  }

  fetchPastFromFirebase() {
    return this.http.get<Medication[]>(this.firebasePastURL, {}).pipe(
      tap(meds => {
        this.medicationsService.updatePastArray(meds);
      })
    );
  }

  saveCurrentMedsToFirebase(meds: Medication[]) {
    const current: Medication[] = meds;

    this.http.put(this.firebaseCurrentURL, current).subscribe(res => {
      console.log("Firebase DB Response:", res);
    });
  }

  savePastMedsToFirebase(meds: Medication[]) {
    const past: Medication[] = meds;

    this.http.put(this.firebasePastURL, past).subscribe(res => {
      console.log("Firebase DB Response:", res);
    });
  }

}
