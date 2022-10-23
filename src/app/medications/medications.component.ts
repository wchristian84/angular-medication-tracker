import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Medication } from './medications.model';
import { MedicationsService } from './medications.service';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.css']
})
export class MedicationsComponent implements OnInit{

  selectedMedication: Medication = {
    name: '',
    dosage: '',
    frequency: '',
    benefits: '',
    sideEffects: '',
    startDate: '',
    stopDate: '',
    reasonStopped: ''
  };
  idx: number = -1;

  constructor(private medicationsService: MedicationsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>
      {this.idx = +params['index'];
      if (this.route.pathFromRoot.toString().includes('current-meds')) {
        this.selectedMedication = this.medicationsService.getCurrentMed(this.idx);
      } else {
        this.selectedMedication = this.medicationsService.getPastMed(this.idx);
      }
    });
  }
}
