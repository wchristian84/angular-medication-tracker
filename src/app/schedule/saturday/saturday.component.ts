import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saturday',
  templateUrl: './saturday.component.html',
  styleUrls: ['./saturday.component.css']
})
export class SaturdayComponent implements OnInit {
  saturdayMorning = [];
  saturdayMidDay = [];
  saturdayEvening = [];
  saturdayNight = [];

  constructor() { }

  ngOnInit(): void {
  }

}
