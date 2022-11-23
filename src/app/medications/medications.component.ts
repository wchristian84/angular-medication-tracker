import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../shared/http/http.service';

import { Medication } from './medications.model';
import { MedicationsService } from './medications.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {
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
  idx: number = -1;
  isCurrent: boolean = false;
  selectedTimes: string[] = [];

  constructor(
    private medicationsService: MedicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.idx = +params['index'];

      if (this.route.pathFromRoot.toString().includes('current-meds')) {
        this.selectedMedication = this.medicationsService.getCurrentMed(this.idx);
        this.isCurrent = true;
      } else {
        this.selectedMedication = this.medicationsService.getPastMed(this.idx);
      }
    });
    this.getDosingTimes();
  }

  deleteMed(index: number) {
    if (confirm(`Are you sure you want to delete ${this.selectedMedication.name}?`)) {
      if (this.isCurrent) {
        this.medicationsService.deleteCurrentMed(index);
      } else {
        this.medicationsService.deletePreviousMed(index);
      }
      this.http.saveMedsToFirebase(this.medicationsService.currentMeds, this.medicationsService.pastMeds);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  endMedication(index: number, stoppedMed: Medication) {
    if (confirm(`Move ${stoppedMed.name} to Previous Medications?`)) {
      this.medicationsService.moveToPastMeds(index, stoppedMed);
      this.http.saveMedsToFirebase(this.medicationsService.currentMeds, this.medicationsService.pastMeds);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  getDosingTimes() {
    let doseTimes = Object.keys(this.selectedMedication.timeOfDay!);
    let doseTimesValues = Object.values(this.selectedMedication.timeOfDay!);

    for (let i = 0; i < doseTimes.length; i++) {
      if (doseTimesValues[i] == true) {
        this.selectedTimes.push(doseTimes[i]);
      }

    }

  }
}
