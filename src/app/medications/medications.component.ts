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
    id: -1,
    name: '',
    isCurrent: false,
    dosage: '',
    frequency: '',
    date: undefined,
    day: '',
    morning: false,
    midday: false,
    evening: false,
    night: false,
    benefits: '',
    sideEffects: '',
    startDate: '',
    stopDate: '',
    reasonStopped: ''
  };
  selectedTimes: string[] = [];

  constructor(
    private medicationsService: MedicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService) { }

  ngOnInit(): void {
    // this.getDosingTimes();
  }

  deleteMed(id: number) {
    if (confirm(`Are you sure you want to delete ${this.selectedMedication.name}?`)) {

      this.http.deleteFromDatabase(id);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  endMedication(stoppedMed: Medication) {
    if (confirm(`Move ${stoppedMed.name} to Previous Medications?`)) {
      stoppedMed.isCurrent = false;
      this.http.saveEditsToDatabase(stoppedMed);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  // getDosingTimes() {
  //   let doseTimes = Object.keys(this.selectedMedication.timeOfDay!);
  //   let doseTimesValues = Object.values(this.selectedMedication.timeOfDay!);

  //   for (let i = 0; i < doseTimes.length; i++) {
  //     if (doseTimesValues[i] == true) {
  //       this.selectedTimes.push(doseTimes[i]);
  //     }

  //   }

  // }
}
