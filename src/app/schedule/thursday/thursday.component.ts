import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';
import { ScheduleService } from '../schedule.service';

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

  constructor(private medicationsService: MedicationsService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
  }

}
