import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { startOfDay } from 'date-fns';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Day;
  CalendarView = CalendarView;

  medSchedule: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: "An event with no end date",
    }
  ];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    console.log(this.viewDate);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

}
