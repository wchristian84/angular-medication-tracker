import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-current-meds',
  templateUrl: './current-meds.component.html',
  styleUrls: ['./current-meds.component.css']
})
export class CurrentMedsComponent implements OnInit, OnDestroy {
  currentMedSubscription = new Subscription;
  currentMedications: Medication[] = [];

  constructor(private medicationsService: MedicationsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentMedications = this.medicationsService.currentMeds;
    this.currentMedSubscription = this.medicationsService.currentMedListChanged.subscribe(res => {
      console.log("current sub response: ", res);
      this.currentMedications = res;
    });
  }

  displayMed(id: number){
    this.medicationsService.getMed(id);
    this.router.navigate(['id'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.currentMedSubscription.unsubscribe();
  }
}
