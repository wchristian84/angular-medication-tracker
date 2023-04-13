import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { ActivatedRoute } from '@angular/router';

import { Medication } from './medications.model';
import { HttpService } from '../shared/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {
  currentMedListChanged = new Subject<Medication[]>();
  pastMedListChanged = new Subject<Medication[]>();
  medSelected = new Subject<Medication>();

  dosingFrequencies = [
    '',
    'Monthly',
    'Weekly',
    'Daily'
  ];

  daysOfWeek = [
    '',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ]

  timesOfDay = [
    'Morning',
    'Midday',
    'Evening',
    "Night",
  ]


  allMeds: Medication[] = [];
  currentMeds: Medication[] = [];
  pastMeds: Medication[] = [];

  constructor(private http:HttpService, private route:ActivatedRoute) { }

  addMed (medication: Medication) {
    // receive medication object from form and save to db
    this.http.saveNewToDatabase(medication).subscribe(res => {
      if (res.payload[0].is_current) {
        this.currentMeds.push(res.payload[0]);
        this.allMeds.push(res.payload[0]);
        this.currentMedListChanged.next(this.currentMeds.slice());
      } else {
        this.pastMeds.push(res.payload[0]);
        this.allMeds.push(res.payload[0]);
        this.pastMedListChanged.next(this.pastMeds.slice());
      }
    });
  }

  getMed (med_id: number) {
        // Find correct medication in array and return values
    if (this.route.pathFromRoot.toString().includes("current-meds")) {
      let chosenMed: Medication | undefined = this.currentMeds.find(med => med.id == med_id);
      console.log('chosenMed: ', chosenMed);
      this.medSelected.next(chosenMed);
    } else {
      let chosenMed: Medication | undefined = this.pastMeds.find(med => med.id == med_id);
      console.log('chosenMed: ', chosenMed);
      this.medSelected.next(chosenMed);
    }
  }

  sortMedications(meds: Medication[]) {
    for (let med of meds) {
      if (med.is_current) {
        this.currentMeds.push(med);
        console.log("currentMeds: ", this.currentMeds);
      } else {
        this.pastMeds.push(med);
        console.log("pastMeds: ", this.pastMeds);
      }
    }
    // send subscription update
    console.log("current meds slice: ", this.currentMeds.slice());
    this.currentMedListChanged.next(this.currentMeds.slice());
    console.log("past meds slice: ", this.pastMeds.slice());
    this.pastMedListChanged.next(this.pastMeds.slice());
  }

  updateMedications() {
    // this.medications = [];
    this.http.fetchMedsFromDatabase().subscribe(res => {
      console.log("response: ", res);
      this.allMeds = res.payload;
      this.sortMedications(this.allMeds);
    });
  }
}
