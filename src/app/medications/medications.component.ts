import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DeleteResponse, HttpService } from '../shared/http/http.service';
import { Subscription } from 'rxjs';

import { Medication } from './medications.model';
import { MedicationsService } from './medications.service';
import Swal from 'sweetalert2';

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

  constructor(
    private medicationsService: MedicationsService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpService) { }

  ngOnInit(): void {
    // this.getDosingTimes();
    this.selectedMedication = this.medicationsService.selectedMed;
    this.route.params.subscribe((params: Params) => {
      this.idx = +params['id'];
      console.log('idx: ', this.idx);
      this.medicationsService.getMed(this.idx);
    });
    this.selectedMedSubscription = this.medicationsService.medSelected.subscribe(res => {
      console.log("selected med sub: ", res);
      this.selectedMedication = res;
    });
  }


  deleteMed(med: Medication) {
    // if (confirm(`Are you sure you want to delete ${this.selectedMedication.name}?`)) {

    //   this.http.deleteFromDatabase(med.id!).subscribe(res => {
    //     if (res.success) {
    //       this.medicationsService.updateMedications();
    //       this.router.navigate(['../../'], { relativeTo: this.route });
    //     }
    //   });
    // }
    Swal.fire({
      title: `Are you sure you want to delete ${this.selectedMedication.name}?`,
      text: "Deletion can't be undone!",
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.deleteFromDatabase(med.id!).subscribe(res => {
          if (res.success) {
            this.medicationsService.updateMedications();
            Swal.fire(
              'Deleted!',
              'Medication has been deleted.',
              'success'
            )
            this.router.navigate(['../../'], { relativeTo: this.route });
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
    // if (confirm()) {
    Swal.fire({
      title: `Move ${stoppedMed.name} to Previous Medications?`,
      icon: 'question',
    }).then((result) => {
      if (result.isConfirmed) {
        stoppedMed.is_current = false;
        this.http.saveEditsToDatabase(stoppedMed);
        this.medicationsService.updateMedications();
        Swal.fire(
          'Success!',
          'Medication moved to Previous Medications.',
          'success'
        )
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    })
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
