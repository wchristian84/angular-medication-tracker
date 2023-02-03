import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/shared/http/http.service';
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

  constructor(private medicationsService: MedicationsService, private http: HttpService) { }

  ngOnInit(): void {
    // this.currentMedications = this.medicationsService.currentMeds;
    this.currentMedSubscription = this.medicationsService.medListChanged.subscribe(data => {
      this.currentMedications = data;
    });
    this.http.fetchCurrentFromFirebase();
  }

  ngOnDestroy(): void {
    this.currentMedSubscription.unsubscribe();
  }
}
