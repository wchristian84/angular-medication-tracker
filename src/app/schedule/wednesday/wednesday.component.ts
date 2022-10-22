import { Component, OnInit } from '@angular/core';
import { MedicationsService } from 'src/app/medications/medications.service';

@Component({
  selector: 'app-wednesday',
  templateUrl: './wednesday.component.html',
  styleUrls: ['./wednesday.component.css']
})
export class WednesdayComponent implements OnInit {

  constructor(private medicationsService: MedicationsService) { }

  ngOnInit(): void {
  }

}
