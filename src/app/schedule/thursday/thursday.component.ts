import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';

@Component({
  selector: 'app-thursday',
  templateUrl: './thursday.component.html',
  styleUrls: ['./thursday.component.css']
})
export class ThursdayComponent implements OnInit {
  thursdayMorning = [];
  thursdayMidDay = [];
  thursdayEvening = [];
  thursdayNight = [];

  constructor(private medicationsService: MedicationsService) { }

  ngOnInit(): void {
  }

}
