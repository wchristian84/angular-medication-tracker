import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';

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

  constructor(private medicationsService: MedicationsService) { }

  ngOnInit(): void {
  }

}
