import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteResponse, HttpService } from '../shared/http/http.service';
import { Subscription } from 'rxjs';

import { Medication } from './medications.model';
import { MedicationsService } from './medications.service';
import Swal from 'sweetalert2';
import { User } from '../shared/auth/user.model';
import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit {
  idx!: number;
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
  currentUserSub = new Subscription;
  currentUser!: User;

  constructor(
    private medicationsService: MedicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.selectedMedication = this.medicationsService.selectedMed;
    this.getDosingTimes();

    this.route.params.subscribe((params: Params) => {
      this.idx = +params['id'];
      console.log('idx: ', this.idx);
      this.medicationsService.getMed(this.idx);
    });

    this.selectedMedSubscription = this.medicationsService.medSelected.subscribe(res => {
      console.log("selected med sub: ", res);
      this.selectedMedication = res;
      this.getDosingTimes();
    });

    this.currentUserSub = this.authService.currentUser.subscribe(res => {
      if (res !=null) {this.currentUser = res};
    })

  }

  deleteMed(med: Medication) {
    Swal.fire({
      title: `Are you sure you want to delete ${this.selectedMedication.name}?`,
      text: "Deletion can't be undone!",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.deleteFromDatabase(med.id!).subscribe(res => {
          if (res.success) {
            this.medicationsService.updateMedications(this.currentUser.id);
            Swal.fire(
              'Deleted!',
              'Medication has been deleted.',
              'success'
            )
            this.router.navigate(['../'], { relativeTo: this.route });
          }
        });

      }
    })
  }

  editMed(id: number) {
    this.medicationsService.getMed(id);
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  endMedication(stoppedMed: Medication) {
    Swal.fire({
      title: `Move ${stoppedMed.name} to Previous Medications?`,
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        stoppedMed.is_current = false;
        this.http.saveEditsToDatabase(stoppedMed).subscribe(res => {
          if (res.success) {
            this.medicationsService.updateMedications(this.currentUser.id);
            Swal.fire(
              'Success!',
              'Medication moved to Previous Medications.',
              'success'
            )
            this.router.navigate(['../'], { relativeTo: this.route });
          }
        });
      }
    })
  }

  getDosingTimes(){
    this.selectedTimes = [];

    if (this.selectedMedication.morning){
      this.selectedTimes.push("Morning");
    }

    if (this.selectedMedication.midday){
      this.selectedTimes.push("Mid-day");
    }

    if (this.selectedMedication.evening){
      this.selectedTimes.push("Evening");
    }

    if (this.selectedMedication.night){
      this.selectedTimes.push("Night");
    }
  }
}
