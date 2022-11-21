import { Component, OnInit } from '@angular/core';
import { endOfWeek, getDate, startOfWeek } from 'date-fns';
import { Medication } from '../medications/medications.model';
import { MedicationsService } from '../medications/medications.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  today!: Date;
  weekStart!: Date;
  weekEnds!: Date;
  dailyMeds: Medication[] = [];
  weeklyMeds: Medication[] = [];
  monthlyMeds: Medication[] = [];
  current: Medication[] = [];

  constructor(private medicationsService: MedicationsService) { }

  ngOnInit(): void {
    // Set the current date
    this.today = new Date();
    // Get the first date of the current week
    this.weekStart = startOfWeek(this.today);
    // Get the last date of the current week
    this.weekEnds = endOfWeek(this.today);
    // Get current meds
    this.current = this.medicationsService.currentMeds.slice();

    for (let medication of this.current) {
      if (medication.frequency === 'Daily') {
        this.dailyMeds.push(medication);
        console.log(this.dailyMeds);
      }
      else if (medication.frequency === 'Weekly') {
        this.weeklyMeds.push(medication);
      }
      else if (medication.frequency === 'Monthly') {
        this.monthlyMeds.push(medication);
      }
    }
  }

}
