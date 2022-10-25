import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

import { Medication } from './medications.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {
  medListChanged = new Subject<Medication[]>();
  medSelected = new Subject<Medication>();

  currentMeds: Medication[] = [ // array for holding current medications
    {name: 'test name', dosage: 'test dosage', frequency: 'test frequency', benefits: 'test benefits', sideEffects: '', startDate: '', stopDate: '', reasonStopped: 'test reason'},
    {name: 'test name 2', dosage: 'test dosage', frequency: 'test frequency', benefits: 'test benefits', sideEffects: '', startDate: '', stopDate: '', reasonStopped: 'test reason'}
  ];

  pastMeds: Medication[] = [// array for holding discontinued medications
    {name: 'blah blah', dosage: 'a lot', frequency: 'as needed', benefits: 'less coughing', sideEffects: 'so much vomiting', startDate: 'May 2003', stopDate: 'June 2003', reasonStopped: 'so much vomiting'},
    {name: 'that one med', dosage: '30 mg', frequency: 'once per day', benefits: 'slept better', sideEffects: 'none', startDate: 'March 2018', stopDate: 'July 2020', reasonStopped: 'quit working as well'}
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
    return this.currentMeds.slice()[index];
  }

  getPastMed (index: number) {
    return this.pastMeds.slice()[index];
  }

  moveToPastMeds (currentMedsIndex: number, medication: Medication) {
    // get index in currentMeds array from template to splice object out
    this.currentMeds.splice(currentMedsIndex, 1);

    // push medication object onto pastMeds array
    this.pastMeds.push(medication);
  }

}
