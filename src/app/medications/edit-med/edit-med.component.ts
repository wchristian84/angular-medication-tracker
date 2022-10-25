import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-edit-med',
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.css']
})
export class EditMedComponent implements OnInit {
  isCurrent: boolean = false;
  editMedForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    dosage: new FormControl(null),
    frequency: new FormControl(null),
    benefits: new FormControl(null),
    sideEffects: new FormControl(null),
    startDate: new FormControl(null),
    stopDate: new FormControl(null),
    reasonStopped: new FormControl(null),
  });

  idx: number = -1;

  selectedMedication: Medication = {
    name: '',
    dosage: '',
    frequency: '',
    benefits: '',
    sideEffects: '',
    startDate: '',
    stopDate: '',
    reasonStopped: ''
  };

  constructor(private medicationsService: MedicationsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>
    {this.idx = +params['index'];
    if (this.route.pathFromRoot.toString().includes('current-meds')) {
      this.selectedMedication = this.medicationsService.getCurrentMed(this.idx);
      this.isCurrent = true;
    } else {
      this.selectedMedication = this.medicationsService.getPastMed(this.idx);
    }
  });

  }

  onFormSubmit() {
     let newMed = new Medication(
      this.editMedForm.value.name,
      this.editMedForm.value.dosage,
      this.editMedForm.value.frequency,
      this.editMedForm.value.benefits,
      this.editMedForm.value.sideEffects,
      this.editMedForm.value.startDate,
      this.editMedForm.value.stopDate,
      this.editMedForm.value.reasonStopped
      );

    if (this.isCurrent) {
      this.medicationsService.editCurrentMed(this.idx, newMed);
    } else {
      this.medicationsService.editPreviousMed(this.idx, newMed);
    }
    alert(`${this.editMedForm.value.name} updated!`);
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
