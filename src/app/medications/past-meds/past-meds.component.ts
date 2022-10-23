import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-past-meds',
  templateUrl: './past-meds.component.html',
  styleUrls: ['./past-meds.component.css']
})
export class PastMedsComponent implements OnInit, OnDestroy {
  pastMedSubscription = new Subscription;
  pastMedications: Medication[] = [];

  constructor(private medicationsService: MedicationsService) { }

  ngOnInit(): void {
    this.pastMedications = this.medicationsService.pastMeds;
    this.pastMedSubscription = this.medicationsService.medListChanged.subscribe(data => {
    this.pastMedications = data;
    console.log(data);
    });
  }

  ngOnDestroy(): void {
    this.pastMedSubscription.unsubscribe();
  }
}
