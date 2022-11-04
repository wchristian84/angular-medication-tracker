import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-sunday',
  templateUrl: './sunday.component.html',
  styleUrls: ['./sunday.component.css']
})
export class SundayComponent implements OnInit {
  sundayMorning = [];
  sundayMidDay = [];
  sundayEvening = [];
  sundayNight = [];

  constructor(private medicationsService: MedicationsService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
  }

}
