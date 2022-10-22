import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';

@Component({
  selector: 'app-tuesday',
  templateUrl: './tuesday.component.html',
  styleUrls: ['./tuesday.component.css']
})
export class TuesdayComponent implements OnInit {
  tuesdayMorning = [];
  tuesdayMidDay = [];
  tuesdayEvening = [];
  tuesdayNight = [];

  constructor(private medicationsService: MedicationsService) { }

  ngOnInit(): void {
  }

}
