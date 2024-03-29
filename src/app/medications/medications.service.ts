import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from "rxjs";
import { ActivatedRoute } from '@angular/router';

import { Medication } from './medications.model';
import { HttpService } from '../shared/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {
  currentMedListChanged = new BehaviorSubject<Medication[] | null>(null);
  pastMedListChanged = new BehaviorSubject<Medication[] | null>(null);
  medSelected = new Subject<Medication>();
  selectedMed!: Medication;

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

  // addMed (medication: Medication) {
  //   // receive medication object from form and save to db
  //   this.http.saveNewToDatabase(medication).subscribe(res => {
  //     if (res.success) {
  //       this.updateMedications();
  //     }
  //   });
  // }

  getMed (med_id: number) {
        // Find correct medication in array and return values
      let chosenMed: Medication | undefined = this.allMeds.find(({id}) => id === med_id);
      this.selectedMed = chosenMed!;
      this.medSelected.next(chosenMed);
  }

  sortMedications(meds: Medication[]) {
    this.currentMeds = [];
    this.pastMeds = [];

    // if (meds.is_current) {
    //   if (meds[0].is_current) {
    //     this.currentMeds.push(meds[0]);
    //   } else {
    //     this.pastMeds.push(meds[0]);
    //   }
    // }
      for (let med of meds) {
        if (med.is_current) {
          this.currentMeds.push(med);
        } else {
          this.pastMeds.push(med);
        }
      }
    // send subscription update
    this.currentMedListChanged.next(this.currentMeds.slice());
    this.pastMedListChanged.next(this.pastMeds.slice());
  }

  updateMedications(id: number) {
    this.http.fetchMedsFromDatabase(id).subscribe(res => {
      this.allMeds = res.payload;
      this.sortMedications(this.allMeds);
    });
  }
}
