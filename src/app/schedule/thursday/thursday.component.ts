import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thursday',
  templateUrl: './thursday.component.html',
  styleUrls: ['./thursday.component.css']
})
export class ThursdayComponent implements OnInit {
  thursdayMorning = [];
  thursdayMidDay = [];
  thursdayEvening = [];
  thursdayNight = [];

  constructor() { }

  ngOnInit(): void {
  }

}
