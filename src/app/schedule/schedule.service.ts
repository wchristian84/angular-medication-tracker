import { Injectable } from "@angular/core";
import { DayOfWeek } from "./schedule.model";

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {
  monday = new DayOfWeek;
  tuesday = new DayOfWeek;
  wednesday = new DayOfWeek;
  thursday = new DayOfWeek;
  friday = new DayOfWeek;
  saturday = new DayOfWeek;
  sunday = new DayOfWeek;
}
