import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { Medication } from '../medications.model';
import { MedicationsService } from '../medications.service';
import { User } from 'src/app/shared/auth/user.model';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Component({
  selector: 'app-past-meds',
  templateUrl: './past-meds.component.html',
  styleUrls: ['./past-meds.component.css']
})
export class PastMedsComponent implements OnInit, OnDestroy {
  pastMedSubscription = new Subscription;
  pastMedications: Medication[] = [];
  currentUserSub = new Subscription;
  currentUser!: User;

  constructor(private medicationsService: MedicationsService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUserSub = this.authService.currentUser.subscribe(res => {
      if (res != null) {
        this.currentUser = res;
      }
    })

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
