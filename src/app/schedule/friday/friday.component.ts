import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friday',
  templateUrl: './friday.component.html',
  styleUrls: ['./friday.component.css']
})
export class FridayComponent implements OnInit {
  fridayMorning = [];
  fridayMidDay = [];
  fridayEvening = [];
  fridayNight = [];

  constructor() { }

  ngOnInit(): void {
  }

}
