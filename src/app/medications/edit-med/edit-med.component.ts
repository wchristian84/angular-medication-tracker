import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-edit-med',
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.css']
})
export class EditMedComponent implements OnInit {
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
    // need to get index from params and get that med to pre-populate form

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
