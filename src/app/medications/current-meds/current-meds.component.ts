import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { User } from 'src/app/shared/auth/user.model';

@Component({
  selector: 'app-current-meds',
  templateUrl: './current-meds.component.html',
  styleUrls: ['./current-meds.component.css']
})
export class CurrentMedsComponent implements OnInit, OnDestroy {
  currentMedSubscription = new Subscription;
  currentMedications: Medication[] = [];
  currentUserSub = new Subscription;
  currentUser!: User;

  constructor(private medicationsService: MedicationsService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUserSub = this.authService.currentUser.subscribe(response => {
      if (response != null){

        this.currentUser = response;
      }
    });

    // this.currentMedications = this.medicationsService.currentMeds;
    this.currentMedSubscription = this.medicationsService.currentMedListChanged.subscribe(res => {
      if (res != null){
        this.currentMedications = res;
      }
    });

  }

  displayMed(id: number){
    this.medicationsService.getMed(id);
    this.router.navigate([id], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.currentUserSub.unsubscribe();
    this.currentMedSubscription.unsubscribe();
  }
}
