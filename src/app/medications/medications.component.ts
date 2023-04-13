import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../shared/http/http.service';
import { Subscription } from 'rxjs';

import { Medication } from './medications.model';
import { MedicationsService } from './medications.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {
  selectedMedSubscription = new Subscription;
  selectedMedication: Medication = {
    name: '',
    is_current: false,
    dosage: '',
    frequency: '',
    date: undefined,
    day: '',
    morning: false,
    midday: false,
    evening: false,
    night: false,
    benefits: '',
    side_effects: '',
    start_date: '',
    stop_date: '',
    reason_stopped: '',
    id: 0,
    user_id: 0
  };
  selectedTimes: string[] = [];

  constructor(
    private medicationsService: MedicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService) { }

  ngOnInit(): void {
    // this.getDosingTimes();
    this.medicationsService.getMed();
    this.selectedMedSubscription = this.medicationsService.medSelected.subscribe(res => {
      this.selectedMedication = res;
    })
  }

  deleteMed(med: Medication) {
    if (confirm(`Are you sure you want to delete ${this.selectedMedication.name}?`)) {

      this.http.deleteFromDatabase(med.id!);
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  endMedication(stoppedMed: Medication) {
    if (confirm(`Move ${stoppedMed.name} to Previous Medications?`)) {
      stoppedMed.is_current = false;
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
