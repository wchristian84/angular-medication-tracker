import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http/http.service';

import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';
import { UserData } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-add-med',
  templateUrl: './add-med.component.html',
  styleUrls: ['./add-med.component.css']
})
export class AddMedComponent implements OnInit {
  frequencies: string[] = [];
  weekdays: string[] = [];
  dosingTimes: string[] = [];
  isCurrent!: boolean;

  addMedForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    dosage: new FormControl<string | null>(null),
    frequency: new FormControl<string | null>(null),
    date: new FormControl<number | null>(null),
    day: new FormControl<string | null>(null),
    morning: new FormControl<boolean>(false),
    midday: new FormControl<boolean>(false),
    evening: new FormControl<boolean>(false),
    night: new FormControl<boolean>(false),
    benefits: new FormControl<string | null>(null),
    side_effects: new FormControl<string | null>(null),
    start_date: new FormControl<string | null>(null),
    stop_date: new FormControl<string | null>(null),
    reason_stopped: new FormControl<string | null>(null),
  });

  constructor(
    private medicationsService: MedicationsService,
    private route: ActivatedRoute,
    private http: HttpService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    if (this.router.url.includes('current-meds')) {
      this.isCurrent = true;
    } else {
      this.isCurrent = false;
    }
    this.frequencies = this.medicationsService.dosingFrequencies;
    this.weekdays = this.medicationsService.daysOfWeek;
    this.dosingTimes = this.medicationsService.timesOfDay;
  }

  // createCheckbox(): FormGroup {
  //   return this.formBuilder.group({
  //     Morning: false,
  //     Midday: false,
  //     Evening: false,
  //     Night: false
  //   });
  // }

  onFormSubmit(medForm: FormGroup) {
    let newMed = new Medication(
    medForm.value.name,
    false,
    medForm.value.dosage,
    medForm.value.frequency,
    medForm.value.date,
    medForm.value.day,
    medForm.value.morning,
    medForm.value.midday,
    medForm.value.evening,
    medForm.value.night,
    medForm.value.benefits,
    medForm.value.side_effects,
    medForm.value.start_date,
    medForm.value.stop_date,
    medForm.value.reason_stopped
    );
    if (this.isCurrent) {
      newMed.is_current = true;
    }
    console.log("newMed: ", newMed);
    this.http.saveNewToDatabase(newMed).subscribe(res => {
      if (res.success){
        alert(`${medForm.value.name} saved!`);
        medForm.reset();
        this.router.navigate(["../"], { relativeTo: this.route });
      } else {
        alert('Error saving medication.');
      }
    });
  }
}
