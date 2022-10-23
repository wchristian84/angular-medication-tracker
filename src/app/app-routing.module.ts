import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMedComponent } from './medications/edit-med/edit-med.component';
import { AddMedComponent } from './medications/add-med/add-med.component';

import { CurrentMedsComponent } from './medications/current-meds/current-meds.component';
import { MedicationsComponent } from './medications/medications.component';
import { PastMedsComponent } from './medications/past-meds/past-meds.component';
import { FridayComponent } from './schedule/friday/friday.component';
import { MondayComponent } from './schedule/monday/monday.component';
import { SaturdayComponent } from './schedule/saturday/saturday.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SundayComponent } from './schedule/sunday/sunday.component';
import { ThursdayComponent } from './schedule/thursday/thursday.component';
import { TuesdayComponent } from './schedule/tuesday/tuesday.component';
import { WednesdayComponent } from './schedule/wednesday/wednesday.component';

const routes: Routes = [
  {path: '', redirectTo: '/current-meds', pathMatch: 'full'},
  {path: 'current-meds', component: CurrentMedsComponent, children: [
    {path: 'add', component: AddMedComponent, pathMatch: 'full'},
    {path: ':index', component: MedicationsComponent},
    {path: ':index/edit', component: EditMedComponent}
  ]},
  {path: 'past-meds', component: PastMedsComponent, children: [
    {path: 'add', component: AddMedComponent, pathMatch: 'full'},
    {path: ':index', component: MedicationsComponent},
    {path: ':index/edit', component: EditMedComponent}
  ]},
  {path: 'schedule', component: ScheduleComponent, children:[
    {path: 'monday', component: MondayComponent},
    {path: 'tuesday', component: TuesdayComponent},
    {path: 'wednesday', component: WednesdayComponent},
    {path: 'thursday', component: ThursdayComponent},
    {path: 'friday', component: FridayComponent},
    {path: 'saturday', component: SaturdayComponent},
    {path: 'sunday', component: SundayComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
