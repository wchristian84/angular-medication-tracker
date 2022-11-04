import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from '@angular/router';

import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-add-med',
  templateUrl: './add-med.component.html',
  styleUrls: ['./add-med.component.css']
})
export class AddMedComponent implements OnInit {
  isCurrent: boolean = false;

  addMedForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    dosage: new FormControl(null),
    frequency: new FormControl(null),
    benefits: new FormControl(null),
    sideEffects: new FormControl(null),
    startDate: new FormControl(null),
    stopDate: new FormControl(null),
    reasonStopped: new FormControl(null),
  });

  constructor(private medicationsService: MedicationsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.pathFromRoot.toString().includes('current-meds')) {
      this.isCurrent = true;
    };
  }

  onFormSubmit() {
     let newMed = new Medication(
      this.addMedForm.value.name,
      this.addMedForm.value.dosage,
      this.addMedForm.value.frequency,
      this.addMedForm.value.benefits,
      this.addMedForm.value.sideEffects,
      this.addMedForm.value.startDate,
      this.addMedForm.value.stopDate,
      this.addMedForm.value.reasonStopped
      );

    if (this.route.pathFromRoot.toString().includes('current-meds')) {
      this.medicationsService.addCurrentMed(newMed);
    } else {
      this.medicationsService.addPreviousMed(newMed);
    }
    alert(`${this.addMedForm.value.name} saved!`)
    this.addMedForm.reset();
  }

}
