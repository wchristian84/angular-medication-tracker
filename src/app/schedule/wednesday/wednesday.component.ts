import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-wednesday',
  templateUrl: './wednesday.component.html',
  styleUrls: ['./wednesday.component.css']
})
export class WednesdayComponent implements OnInit {

  constructor(private medicationsService: MedicationsService, private scheduleService: ScheduleService) { }

  ngOnInit(): void {
  }

}
