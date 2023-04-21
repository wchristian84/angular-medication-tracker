import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';

@Component({
  selector: 'app-past-meds',
  templateUrl: './past-meds.component.html',
  styleUrls: ['./past-meds.component.css']
})
export class PastMedsComponent implements OnInit, OnDestroy {
  pastMedSubscription = new Subscription;
  pastMedications!: Medication[];

  constructor(private medicationsService: MedicationsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.pastMedications = this.medicationsService.pastMeds;
    this.pastMedSubscription = this.medicationsService.pastMedListChanged.subscribe(res => {
      if (res != null){
        this.pastMedications = res;
      }
    })
  }

  displayMed(id: number){
    this.medicationsService.getMed(id);
    this.router.navigate([id], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.pastMedSubscription.unsubscribe();
  }
}
