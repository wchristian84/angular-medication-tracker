import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from './search/search.service';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  isAuthenticated!: boolean;

  constructor(
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ){}

    ngOnInit(): void {
        this.authService.currentUser.subscribe((user) => {
          this.isAuthenticated = !!user;
        });
        if (!this.isAuthenticated) {
          this.router.navigate(['/auth'], {relativeTo: this.route});
        }
    }

    onLogout() {
      this.authService.signOut();
    }

    onSearch(form: NgForm) {
      this.searchService.onRxSearch(form.value.term);
      this.router.navigate(['/search'], { relativeTo: this.route})
    }

    ngOnDestroy(): void {
        this.authService.currentUser.unsubscribe();
    }

}
