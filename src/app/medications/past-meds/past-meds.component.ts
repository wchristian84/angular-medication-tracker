import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/http/http.service';

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
  isDisplaying: boolean = false;

  constructor(private medicationsService: MedicationsService, private http: HttpService) { }

  ngOnInit(): void {
    this.pastMedSubscription = this.medicationsService.medListChanged.subscribe(data => {
      this.pastMedications = data;
    });
    this.http.fetchMedsFromDatabase();
  }

  ngOnDestroy(): void {
    this.pastMedSubscription.unsubscribe();
  }
}
