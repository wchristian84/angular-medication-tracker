import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-current-meds',
  templateUrl: './current-meds.component.html',
  styleUrls: ['./current-meds.component.css']
})
export class CurrentMedsComponent implements OnInit, OnDestroy {
  currentMedSubscription = new Subscription;
  currentMedications: Medication[] = [];

  constructor(private medicationsService: MedicationsService) { }

  ngOnInit(): void {
    this.currentMedSubscription = this.medicationsService.currentMedListChanged.subscribe(res => {
      console.log("current sub response: ", res);
      this.currentMedications = res;
    });
  }

  ngOnDestroy(): void {
    this.currentMedSubscription.unsubscribe();
  }
}
