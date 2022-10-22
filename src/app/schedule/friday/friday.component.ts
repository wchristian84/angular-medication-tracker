import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';

@Component({
  selector: 'app-friday',
  templateUrl: './friday.component.html',
  styleUrls: ['./friday.component.css']
})
export class FridayComponent implements OnInit {
  fridayMorning = [];
  fridayMidDay = [];
  fridayEvening = [];
  fridayNight = [];

  constructor(private medicationsService: MedicationsService) { }

  ngOnInit(): void {
  }

}
