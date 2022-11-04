import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-saturday',
  templateUrl: './saturday.component.html',
  styleUrls: ['./saturday.component.css']
})
export class SaturdayComponent implements OnInit {
  saturdayMorning = [];
  saturdayMidDay = [];
  saturdayEvening = [];
  saturdayNight = [];

  constructor(private medicationsService: MedicationsService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
  }

}
