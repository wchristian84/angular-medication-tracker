import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from 'src/app/shared/http/http.service';
import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-med',
  templateUrl: './edit-med.component.html',
  styleUrls: ['./edit-med.component.css']
})
export class EditMedComponent implements OnInit {
  frequencies: string[] = [];
  weekdays: string[] = [];
  dosingTimes: string[] = [];
  selectedTimes: string[] = [];

  editMedForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    is_current: new FormControl<boolean>(false, Validators.required),
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

  idx = -1;

  selectedMedication: Medication = {
    id: -1,
    name: '',
    is_current: false,
    dosage: '',
    frequency: '',
    date: 0,
    day: '',
    morning: false,
    midday: false,
    evening: false,
    night: false,
    benefits: '',
    side_effects: '',
    start_date: '',
    stop_date: '',
    reason_stopped: ''
  };

  constructor(
    private medicationsService: MedicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.selectedMedication = this.medicationsService.selectedMed;
    this.frequencies = this.medicationsService.dosingFrequencies;
    this.weekdays = this.medicationsService.daysOfWeek;
    this.dosingTimes = this.medicationsService.timesOfDay;

    this.route.params.subscribe((params: Params) =>
    { this.idx = +params['id'];
      let getMed = this.medicationsService.getMed(this.idx)
      if (getMed != undefined) {
        this.selectedMedication = getMed
      }

    this.editMedForm.patchValue({
      'name': this.selectedMedication.name,
      'is_current': this.selectedMedication.is_current,
      'dosage': this.selectedMedication.dosage!,
      'frequency': this.selectedMedication.frequency!,
      'date': this.selectedMedication.date!,
      'day': this.selectedMedication.day!,
      'morning': this.selectedMedication.morning!,
      'midday': this.selectedMedication.midday!,
      'evening': this.selectedMedication.evening!,
      'night': this.selectedMedication.night!,
      'benefits': this.selectedMedication.benefits!,
      'side_effects': this.selectedMedication.side_effects!,
      'start_date': this.selectedMedication.start_date!,
      'stop_date': this.selectedMedication.stop_date!,
      'reason_stopped': this.selectedMedication.reason_stopped!
      });
    });
  }

  onFormSubmit(medForm: FormGroup) {
    this.selectedMedication.name = medForm.value.name;
    this.selectedMedication.is_current = medForm.value.is_current;
    this.selectedMedication.dosage = medForm.value.dosage;
    this.selectedMedication.frequency = medForm.value.frequency;
    this.selectedMedication.date = medForm.value.date;
    this.selectedMedication.day = medForm.value.day;
    this.selectedMedication.morning = medForm.value.morning;
    this.selectedMedication.midday = medForm.value.midday;
    this.selectedMedication.evening = medForm.value.evening;
    this.selectedMedication.night = medForm.value.night;
    this.selectedMedication.benefits = medForm.value.benefits;
    this.selectedMedication.side_effects = medForm.value.side_effects;
    this.selectedMedication.start_date = medForm.value.start_date;
    this.selectedMedication.stop_date = medForm.value.stop_date;
    this.selectedMedication.reason_stopped = medForm.value.reason_stopped;

    this.http.saveEditsToDatabase(this.selectedMedication).subscribe(res => {
      if (res.success) {
        Swal.fire(`${this.editMedForm.value.name} updated!`);
    }});

    this.router.navigate(["../../"], { relativeTo: this.route });
  }
}
