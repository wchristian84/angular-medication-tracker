import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http/http.service';

import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-add-med',
  templateUrl: './add-med.component.html',
  styleUrls: ['./add-med.component.css']
})
export class AddMedComponent implements OnInit {
  frequencies: string[] = [];
  weekdays: string[] = [];
  dosingTimes: string[] = [];

  addMedForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    isCurrent: new FormControl<boolean>(false),
    dosage: new FormControl<string | null>(null),
    frequency: new FormControl<string | null>(null),
    date: new FormControl<number | null>(null),
    day: new FormControl<string | null>(null),
    timeOfDay: this.createCheckbox(),
    benefits: new FormControl<string | null>(null),
    sideEffects: new FormControl<string | null>(null),
    startDate: new FormControl<string | null>(null),
    stopDate: new FormControl<string | null>(null),
    reasonStopped: new FormControl<string | null>(null),
  });

  constructor(
    private medicationsService: MedicationsService,
    private route: ActivatedRoute,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.frequencies = this.medicationsService.dosingFrequencies;
    this.weekdays = this.medicationsService.daysOfWeek;
    this.dosingTimes = this.medicationsService.timesOfDay;
  }

  createCheckbox(): FormGroup {
    return this.formBuilder.group({
      Morning: false,
      Midday: false,
      Evening: false,
      Night: false
    });
  }

  onFormSubmit(medForm: FormGroup) {
     let newMed = new Medication(
      medForm.value.name,
      medForm.value.isCurrent,
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

    this.http.saveMedsToDatabase(newMed);
    alert(`${medForm.value.name} saved!`);
    medForm.reset();
    this.router.navigate(["../"], { relativeTo: this.route });
  }

}
