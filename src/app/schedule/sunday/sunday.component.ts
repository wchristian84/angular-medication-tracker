import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sunday',
  templateUrl: './sunday.component.html',
  styleUrls: ['./sunday.component.css']
})
export class SundayComponent implements OnInit {
  sundayMorning = [];
  sundayMidDay = [];
  sundayEvening = [];
  sundayNight = [];

  constructor() { }

  ngOnInit(): void {
  }

}
