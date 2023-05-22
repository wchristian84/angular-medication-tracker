import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Medication } from '../medications/medications.model';
import { MedicationsService } from '../medications/medications.service';
import { HttpService } from '../shared/http/http.service';
import { SearchService } from './search.service';
import { AuthService } from '../shared/auth/auth.service';
import Swal from 'sweetalert2';
import { User } from '../shared/auth/user.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  results: Medication[] = [];
  resultsSub = new Subscription;
  currentUserSub = new Subscription;
  currentUser!: User;
  constructor(
    private searchService: SearchService,
    private medicationsService: MedicationsService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.results = this.searchService.getResults();
    this.resultsSub = this.searchService.resultsChanged.subscribe((response: Medication[]) => {
      this.results = response;
    });
    this.currentUserSub = this.authService.currentUser.subscribe((res: User | null) => {
      if (res != null){
        this.currentUser = res;
      }
    });
  }

  onAddCurrent(medication: Medication) {
    medication.is_current = true;
    this.http.saveNewToDatabase(medication).subscribe((res: { success: boolean; }) => {
      if (res.success){
        Swal.fire(`${medication.name} saved to Current Medications.`).then((result) => {
          if (result.isConfirmed) {
            this.medicationsService.updateMedications(this.currentUser.id);
            this.router.navigate(['/current-meds'], { relativeTo: this.route });
          }
        });
      }
    });
  }

  onAddPrevious(medication: Medication) {
    medication.is_current = false;
    this.http.saveNewToDatabase(medication).subscribe((res: { success: boolean; }) => {
      if (res.success){
        Swal.fire(`${medication.name} saved to Current Medications.`).then((result) => {
          if (result.isConfirmed) {
            this.medicationsService.updateMedications(this.currentUser.id);
            this.router.navigate(['/past-meds'], { relativeTo: this.route });
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
      this.resultsSub.unsubscribe();
      this.currentUserSub.unsubscribe();
  }

}
