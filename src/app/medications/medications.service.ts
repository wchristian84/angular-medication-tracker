import { Injectable } from '@angular/core';
import { Subject } from "rxjs";


import { Medication } from './medications.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {
  medListChanged = new Subject<Medication[]>();
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


  currentMeds: Medication[] = [ // array for holding current medications
  ];

  pastMeds: Medication[] = [// array for holding discontinued medications
  ];

  constructor() { }

  addCurrentMed (medication: Medication) {
    // receive medication object from form and add to currentMeds array
    this.currentMeds.push(medication);
    // send subscription update
    this.medListChanged.next(this.currentMeds.slice());
  }

  addPreviousMed (medication: Medication) {
    // receive medication object from form and add to pastMeds array
    this.pastMeds.push(medication);
    // send subscription update
    this.medListChanged.next(this.pastMeds.slice());
  }

  deleteCurrentMed (index: number) {
    // get array index from template and splice it from currentMeds array
    this.currentMeds.splice(index, 1);
    // send subscription update
    this.medListChanged.next(this.currentMeds.slice());
  }

  deletePreviousMed (index: number) {
    // get array index from template and splice it from pastMeds array
    this.pastMeds.splice(index, 1);
    // send subscription update
    this.medListChanged.next(this.pastMeds.slice());
  }

  editCurrentMed (index: number, medication: Medication) {
    // get array index and set item to updated values
    this.currentMeds[index] = medication;
    // send subscription update
    this.medListChanged.next(this.currentMeds.slice());
  }

  editPreviousMed (index: number, medication: Medication) {
    // get array index and set item to updated values
    this.pastMeds[index] = medication;
    // send subscription update
    this.medListChanged.next(this.pastMeds.slice());
  }

  getCurrentMed (index: number) {
    // Find correct medication in array and return values
    return this.currentMeds.slice()[index];
  }

  getPastMed (index: number) {
    // Find correct medication in array and return values
    return this.pastMeds.slice()[index];
  }

  moveToPastMeds (currentMedsIndex: number, medication: Medication) {
    // get index in currentMeds array from template to splice object out
    this.currentMeds.splice(currentMedsIndex, 1);

    // push medication object onto pastMeds array
    this.pastMeds.push(medication);

    // send subscription update
    this.medListChanged.next(this.pastMeds.slice());
    this.medListChanged.next(this.currentMeds.slice());
  }

  updateCurrentArray(meds: Medication[]) {
    this.currentMeds = meds;
    // send subscription update
    this.medListChanged.next(this.currentMeds.slice());
  }

  updatePastArray(meds: Medication[]) {
    this.pastMeds = meds;
    // send subscription update
    this.medListChanged.next(this.pastMeds.slice());
  }
}
