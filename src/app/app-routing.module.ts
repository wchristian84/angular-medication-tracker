import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMedComponent } from './medications/edit-med/edit-med.component';
import { AddMedComponent } from './medications/add-med/add-med.component';

import { CurrentMedsComponent } from './medications/current-meds/current-meds.component';
import { MedicationsComponent } from './medications/medications.component';
import { PastMedsComponent } from './medications/past-meds/past-meds.component';

import { ScheduleComponent } from './schedule/schedule.component';
import { SearchComponent } from './search/search.component';
import { AuthComponent } from './shared/auth/auth.component';
import { AuthGuard } from './shared/auth/auth.guard';

const routes: Routes = [
  {path: '', redirectTo: '/current-meds', pathMatch: 'full'},
  {path: 'current-meds', component: CurrentMedsComponent, canActivate: [AuthGuard], children: [
    {path: 'add', component: AddMedComponent, pathMatch: 'full'},
    {path: ':index', component: MedicationsComponent},
    {path: ':index/edit', component: EditMedComponent}
  ]},
  {path: 'past-meds', component: PastMedsComponent, canActivate: [AuthGuard], children: [
    {path: 'add', component: AddMedComponent, pathMatch: 'full'},
    {path: ':index', component: MedicationsComponent},
    {path: ':index/edit', component: EditMedComponent}
  ]},
  {path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard]},
  {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
