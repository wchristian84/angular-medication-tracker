import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http/http.service';
import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-edit-med',
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.css']
})
export class EditMedComponent implements OnInit {
  isCurrent: boolean = false;
  frequencies: string[] = [];
  weekdays: string[] = [];
  dosingTimes: string[] = [];
  selectedTimes: string[] = [];

  editMedForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
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

  idx: number = -1;

  selectedMedication: Medication = {
    name: '',
    dosage: '',
    frequency: '',
    date: undefined,
    day: '',
    timeOfDay: {
      Morning: false,
      Midday: false,
      Evening: false,
      Night: false
    },
    benefits: '',
    sideEffects: '',
    startDate: '',
    stopDate: '',
    reasonStopped: ''
  };

  constructor(
    private medicationsService: MedicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.frequencies = this.medicationsService.dosingFrequencies;
    this.weekdays = this.medicationsService.daysOfWeek;
    this.dosingTimes = this.medicationsService.timesOfDay;

    this.route.params.subscribe((params: Params) =>
    { this.idx = +params['index'];
    if (this.route.pathFromRoot.toString().includes('current-meds')) {
      this.selectedMedication = this.medicationsService.getCurrentMed(this.idx);
      this.isCurrent = true;
      console.log(this.selectedMedication);
    } else {
      this.selectedMedication = this.medicationsService.getPastMed(this.idx);
    }

    this.editMedForm.patchValue({
      'name': this.selectedMedication.name,
      'dosage': this.selectedMedication.dosage!,
      'frequency': this.selectedMedication.frequency!,
      'date': this.selectedMedication.date!,
      'day': this.selectedMedication.day!,
      'timeOfDay': this.selectedMedication.timeOfDay!,
      'benefits': this.selectedMedication.benefits!,
      'sideEffects': this.selectedMedication.sideEffects!,
      'startDate': this.selectedMedication.startDate!,
      'stopDate': this.selectedMedication.stopDate!,
      'reasonStopped': this.selectedMedication.reasonStopped!
      });

      console.log(this.editMedForm.value);
    });

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

    if (this.isCurrent) {
      this.medicationsService.editCurrentMed(this.idx, newMed);
    } else {
      this.medicationsService.editPreviousMed(this.idx, newMed);
    }
    this.http.saveMedsToFirebase(this.medicationsService.currentMeds, this.medicationsService.pastMeds);
    alert(`${this.editMedForm.value.name} updated!`);
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onCheck(medTime: string) {
    if (this.selectedTimes.includes(medTime)) {
      for (let i = 0; i < this.selectedTimes.length; i++) {
        if (this.selectedTimes[i] == medTime) {
          this.selectedTimes.splice(i, 1);
        }
      }
    } else {
      this.selectedTimes.push(medTime);
    }
  }
}
