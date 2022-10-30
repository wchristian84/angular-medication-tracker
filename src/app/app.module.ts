import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentMedsComponent } from './medications/current-meds/current-meds.component';
import { PastMedsComponent } from './medications/past-meds/past-meds.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MedicationsComponent } from './medications/medications.component';
import { MondayComponent } from './schedule/monday/monday.component';
import { TuesdayComponent } from './schedule/tuesday/tuesday.component';
import { WednesdayComponent } from './schedule/wednesday/wednesday.component';
import { ThursdayComponent } from './schedule/thursday/thursday.component';
import { FridayComponent } from './schedule/friday/friday.component';
import { SaturdayComponent } from './schedule/saturday/saturday.component';
import { SundayComponent } from './schedule/sunday/sunday.component';
import { EditMedComponent } from './medications/edit-med/edit-med.component';
import { AddMedComponent } from './medications/add-med/add-med.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentMedsComponent,
    PastMedsComponent,
    ScheduleComponent,
    MedicationsComponent,
    MondayComponent,
    TuesdayComponent,
    WednesdayComponent,
    ThursdayComponent,
    FridayComponent,
    SaturdayComponent,
    SundayComponent,
    EditMedComponent,
    AddMedComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
