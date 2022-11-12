import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from 'src/app/shared/http/http.service';

import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-add-med',
  templateUrl: './add-med.component.html',
  styleUrls: ['./add-med.component.css']
})
export class AddMedComponent implements OnInit {
  isCurrent: boolean = false;

  addMedForm = new UntypedFormGroup({
    name: new UntypedFormControl(null, Validators.required),
    dosage: new UntypedFormControl(null),
    frequency: new UntypedFormControl(null),
    benefits: new UntypedFormControl(null),
    sideEffects: new UntypedFormControl(null),
    startDate: new UntypedFormControl(null),
    stopDate: new UntypedFormControl(null),
    reasonStopped: new UntypedFormControl(null),
  });

  constructor(private medicationsService: MedicationsService, private route: ActivatedRoute, private http: HttpService) { }

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
    this.http.saveMedsToFirebase(this.medicationsService.currentMeds, this.medicationsService.pastMeds);
    alert(`${this.addMedForm.value.name} saved!`);
    this.addMedForm.reset();
  }

}
