import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

}
