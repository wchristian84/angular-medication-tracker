import { Component, OnInit } from '@angular/core';
import { add, endOfWeek, startOfWeek } from 'date-fns';
import { Medication } from '../medications/medications.model';
import { MedicationsService } from '../medications/medications.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  // Date Variables
  today!: Date;
  weekStart!: Date;
  weekEnds!: Date;
  daysOfWeek: Date[] = [];
  // Arrays for Medications
  dailyMeds: Medication[] = [];
  weeklyMeds: Medication[] = [];
  monthlyMeds: Medication[] = [];
  current: Medication[] = [];
  // Objects to hold meds for each day
  sunday = {
    'morning': [] as string[],
    'midday': [] as string[],
    'evening': [] as string[],
    'night': [] as string[]
  };
  monday = {
    'morning': [] as string[],
    'midday': [] as string[],
    'evening': [] as string[],
    'night': [] as string[]
  };
  tuesday = {
    'morning': [] as string[],
    'midday': [] as string[],
    'evening': [] as string[],
    'night': [] as string[]
  };
  wednesday = {
    'morning': [] as string[],
    'midday': [] as string[],
    'evening': [] as string[],
    'night': [] as string[]
  };
  thursday = {
    'morning': [] as string[],
    'midday': [] as string[],
    'evening': [] as string[],
    'night': [] as string[]
  };
  friday = {
    'morning': [] as string[],
    'midday': [] as string[],
    'evening': [] as string[],
    'night': [] as string[]
  };
  saturday = {
    'morning': [] as string[],
    'midday': [] as string[],
    'evening': [] as string[],
    'night': [] as string[]
  };

  constructor(private medicationsService: MedicationsService) { }

  ngOnInit(): void {
    // Set the current date
    this.today = new Date();
    // Get the first date of the current week
    this.weekStart = startOfWeek(this.today);
    // Get the last date of the current week
    this.weekEnds = endOfWeek(this.today);
    // Get current meds
    this.current = this.medicationsService.currentMeds

    this.sortByFrequency();
    this.sortDaily();
    this.sortWeekly();
    this.sortMonthly(this.weekStart);


  }

  pushToAll(dosingTime: string, medName: string) {
    if (dosingTime == 'Morning') {
      this.sunday.morning.push(medName);
      this.monday.morning.push(medName);
      this.tuesday.morning.push(medName);
      this.wednesday.morning.push(medName);
      this.thursday.morning.push(medName);
      this.friday.morning.push(medName);
      this.saturday.morning.push(medName);
    }
    else if (dosingTime == 'Mid-day') {
      this.sunday.midday.push(medName);
      this.monday.midday.push(medName);
      this.tuesday.midday.push(medName);
      this.wednesday.midday.push(medName);
      this.thursday.midday.push(medName);
      this.friday.midday.push(medName);
      this.saturday.midday.push(medName);
    }
    else if (dosingTime == 'Evening') {
      this.sunday.evening.push(medName);
      this.monday.evening.push(medName);
      this.tuesday.evening.push(medName);
      this.wednesday.evening.push(medName);
      this.thursday.evening.push(medName);
      this.friday.evening.push(medName);
      this.saturday.evening.push(medName);
    }
    else if (dosingTime == 'Night') {
      this.sunday.night.push(medName);
      this.monday.night.push(medName);
      this.tuesday.night.push(medName);
      this.wednesday.night.push(medName);
      this.thursday.night.push(medName);
      this.friday.night.push(medName);
      this.saturday.night.push(medName);
    }
  }

  sortByFrequency() {
    for (let medication of this.current) {
      if (medication.frequency === 'Daily') {
        this.dailyMeds.push(medication);
      }
      else if (medication.frequency === 'Weekly') {
        this.weeklyMeds.push(medication);
      }
      else if (medication.frequency === 'Monthly') {
        this.monthlyMeds.push(medication);
      }
    }
  }

  sortDaily() {
    if (this.dailyMeds.length > 0){
      for (let medication of this.dailyMeds) {
        if (medication.morning) {
          this.pushToAll('Morning', medication.name);
        }

        if (medication.midday) {
          this.pushToAll('Mid-day', medication.name);
        }

        if (medication.evening) {
          this.pushToAll('Evening', medication.name);
        }

        if (medication.night) {
          this.pushToAll('Night', medication.name);
        }
      }
    }
  }

  sortMonthly(starts: Date) {
    if (this.monthlyMeds.length > 0) {
      for (let i = 0; i < 7; i++) {
        const newDay = add(starts, {days: i});
        this.daysOfWeek.push(newDay);
      }

      for (let med of this.monthlyMeds) {
        for (let i = 0; i < 6; i++) {
          if (med.date == this.daysOfWeek[i].getDate()) {
            if (med.morning) {
              switch(i) {
                case 0:
                  this.sunday.morning.push(med.name);
                  break;
                case 1:
                  this.monday.morning.push(med.name);
                  break;
                case 2:
                  this.tuesday.morning.push(med.name);
                  break;
                case 3:
                  this.wednesday.morning.push(med.name);
                  break;
                case 4:
                  this.thursday.morning.push(med.name);
                  break;
                case 5:
                  this.friday.morning.push(med.name);
                  break;
                case 6:
                  this.saturday.morning.push(med.name);
                  break;
              }
            }
            if (med.midday) {
              switch(i) {
                case 0:
                  this.sunday.midday.push(med.name);
                  break;
                case 1:
                  this.monday.midday.push(med.name);
                  break;
                case 2:
                  this.tuesday.midday.push(med.name);
                  break;
                case 3:
                  this.wednesday.midday.push(med.name);
                  break;
                case 4:
                  this.thursday.midday.push(med.name);
                  break;
                case 5:
                  this.friday.midday.push(med.name);
                  break;
                case 6:
                  this.saturday.midday.push(med.name);
                  break;
              }
            }
            if (med.evening) {
              switch(i) {
                case 0:
                  this.sunday.evening.push(med.name);
                  break;
                case 1:
                  this.monday.evening.push(med.name);
                  break;
                case 2:
                  this.tuesday.evening.push(med.name);
                  break;
                case 3:
                  this.wednesday.evening.push(med.name);
                  break;
                case 4:
                  this.thursday.evening.push(med.name);
                  break;
                case 5:
                  this.friday.evening.push(med.name);
                  break;
                case 6:
                  this.saturday.evening.push(med.name);
                  break;
              }
            }
            if (med.night) {
              switch(i) {
                case 0:
                  this.sunday.night.push(med.name);
                  break;
                case 1:
                  this.monday.night.push(med.name);
                  break;
                case 2:
                  this.tuesday.night.push(med.name);
                  break;
                case 3:
                  this.wednesday.night.push(med.name);
                  break;
                case 4:
                  this.thursday.night.push(med.name);
                  break;
                case 5:
                  this.friday.night.push(med.name);
                  break;
                case 6:
                  this.saturday.night.push(med.name);
                  break;
                }
              }
            }
          }
        }
      }
    }

  sortWeekly() {
    if (this.weeklyMeds.length > 0) {
      for (let medication of this.weeklyMeds) {
        if (medication.morning) {
          switch(medication.day) {
            case 'Sunday':
              this.sunday.morning.push(medication.name);
              break;
            case 'Monday':
              this.monday.morning.push(medication.name);
              break;
            case 'Tuesday':
              this.tuesday.morning.push(medication.name);
              break;
            case 'Wednesday':
              this.wednesday.morning.push(medication.name);
              break;
            case 'Thursday':
              this.thursday.morning.push(medication.name);
              break;
            case 'Friday':
              this.friday.morning.push(medication.name);
              break;
            case 'Saturday':
              this.saturday.morning.push(medication.name);
              break;
          }
        }
        if (medication.midday) {
          switch(medication.day) {
            case 'Sunday':
              this.sunday.midday.push(medication.name);
              break;
            case 'Monday':
              this.monday.midday.push(medication.name);
              break;
            case 'Tuesday':
              this.tuesday.midday.push(medication.name);
              break;
            case 'Wednesday':
              this.wednesday.midday.push(medication.name);
              break;
            case 'Thursday':
              this.thursday.midday.push(medication.name);
              break;
            case 'Friday':
              this.friday.midday.push(medication.name);
              break;
            case 'Saturday':
              this.saturday.midday.push(medication.name);
              break;
          }
        }
        if (medication.evening) {
          switch(medication.day) {
            case 'Sunday':
              this.sunday.evening.push(medication.name);
              break;
            case 'Monday':
              this.monday.evening.push(medication.name);
              break;
            case 'Tuesday':
              this.tuesday.evening.push(medication.name);
              break;
            case 'Wednesday':
              this.wednesday.evening.push(medication.name);
              break;
            case 'Thursday':
              this.thursday.evening.push(medication.name);
              break;
            case 'Friday':
              this.friday.evening.push(medication.name);
              break;
            case 'Saturday':
              this.saturday.evening.push(medication.name);
              break;
          }
        }
        if (medication.night) {
          switch(medication.day) {
            case 'Sunday':
              this.sunday.night.push(medication.name);
              break;
            case 'Monday':
              this.monday.night.push(medication.name);
              break;
            case 'Tuesday':
              this.tuesday.night.push(medication.name);
              break;
            case 'Wednesday':
              this.wednesday.night.push(medication.name);
              break;
            case 'Thursday':
              this.thursday.night.push(medication.name);
              break;
            case 'Friday':
              this.friday.night.push(medication.name);
              break;
            case 'Saturday':
              this.saturday.night.push(medication.name);
              break;
            }
          }
        }
      }
    }

}
