import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from './search/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute){}

    onSearch(form: NgForm) {
      this.searchService.onRxSearch(form.value.term);
      this.router.navigate(['/search'], { relativeTo: this.route})
    }

}
