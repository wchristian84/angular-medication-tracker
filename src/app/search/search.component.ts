import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Medication } from '../medications/medications.model';
import { MedicationsService } from '../medications/medications.service';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  results: Medication[] = [];
  resultsSub = new Subscription;
  constructor(
    private searchService: SearchService,
    private medicationsService: MedicationsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.results = this.searchService.getResults();
    this.resultsSub = this.searchService.resultsChanged.subscribe((response: Medication[]) => {
      this.results = response;
    })
  }

  onAddCurrent(medication: Medication) {
    this.medicationsService.addCurrentMed(medication);
    alert(`${medication.name} saved to Current Medications.`);
    this.router.navigate(['/current-meds'], { relativeTo: this.route });

  }

  onAddPrevious(medication: Medication) {
    this.medicationsService.addPreviousMed(medication);
    alert(`${medication.name} saved to Previous Medications.`);
    this.router.navigate(['/past-meds'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
      this.resultsSub.unsubscribe();
  }

}
