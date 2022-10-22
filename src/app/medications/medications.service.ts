import { Injectable } from '@angular/core';
import { Medication } from './medications.model';

@Injectable({
  providedIn: 'root'
})
export class MedicationsService {
  currentMeds: Medication[] = []; // array for holding current medications
  pastMeds: Medication[] = []; // array for holding discontinued medications

  constructor() { }

  addCurrentMed (medication: Medication) {
    // receive medication object from form and add to currentMeds array
    this.currentMeds.push(medication);
  }

  addPreviousMed (medication: Medication) {
    // receive medication object from form and add to pastMeds array
    this.pastMeds.push(medication);
  }

  deleteCurrentMed (index: number) {
    // get array index from template and splice it from currentMeds array
  }

  deletePreviousMed (index: number) {
    // get array index from template and splice it from pastMeds array
  }

  editCurrentMed (index: number, medication: Medication) {
    // get array index and use it to splice the existing medication object out

    //push the updated info onto the currentMeds array
  }

  editPreviousMed (index: number, medication: Medication) {
    // get array index and use it to splice the existing medication object out

    // push the updated info onto the pastMeds array
  }

  moveToPastMeds (currentMedsIndex: number, medication: Medication) {
    // get index in currentMeds array from template to splice object out

    // push medication object onto pastMeds array
  }

}
