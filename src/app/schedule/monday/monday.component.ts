import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-monday',
  templateUrl: './monday.component.html',
  styleUrls: ['./monday.component.css']
})
export class MondayComponent implements OnInit {

  mondayMorning = [];
  mondayMidDay = [];
  mondayEvening = [];
  mondayNight = [];

  constructor(private medicationsService: MedicationsService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
  }

}
