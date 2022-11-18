import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, Validators, FormControl, FormGroup, FormArray } from "@angular/forms";
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
  frequencies: string[] = [];
  weekdays: string[] = [];
  dosingTimes: string[] = [];

  addMedForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    dosage: new FormControl<string | null>(null),
    frequency: new FormControl<string | null>(null),
    date: new FormControl<number | null>(null),
    day: new FormControl<string | null>(null),
    timeOfDay: new FormArray([]),
    benefits: new FormControl<string | null>(null),
    sideEffects: new FormControl<string | null>(null),
    startDate: new FormControl<string | null>(null),
    stopDate: new FormControl<string | null>(null),
    reasonStopped: new FormControl<string | null>(null),
  });

  constructor(private medicationsService: MedicationsService, private route: ActivatedRoute, private http: HttpService) { }

  ngOnInit(): void {
    this.frequencies = this.medicationsService.dosingFrequencies;
    this.weekdays = this.medicationsService.daysOfWeek;
    this.dosingTimes = this.medicationsService.timesOfDay;

    if (this.route.pathFromRoot.toString().includes('current-meds')) {
      this.isCurrent = true;
    };
  }

  onFormSubmit(medForm: FormGroup) {
     let newMed = new Medication(
      medForm.value.name,
      medForm.value.dosage,
      medForm.value.frequency,
      medForm.value.date,
      medForm.value.day,
      medForm.value.timeOfDay,
      medForm.value.benefits,
      medForm.value.sideEffects,
      medForm.value.startDate,
      medForm.value.stopDate,
      medForm.value.reasonStopped
      );

    if (this.route.pathFromRoot.toString().includes('current-meds')) {
      this.medicationsService.addCurrentMed(newMed);
    } else {
      this.medicationsService.addPreviousMed(newMed);
    }
    this.http.saveMedsToFirebase(this.medicationsService.currentMeds, this.medicationsService.pastMeds);
    alert(`${medForm.value.name} saved!`);
    medForm.reset();
  }

}
