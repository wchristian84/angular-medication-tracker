import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { FridayComponent } from "./friday/friday.component";
import { MondayComponent } from "./monday/monday.component";
import { SaturdayComponent } from "./saturday/saturday.component";
import { ScheduleComponent } from "./schedule.component";
import { SundayComponent } from "./sunday/sunday.component";
import { ThursdayComponent } from "./thursday/thursday.component";
import { TuesdayComponent } from "./tuesday/tuesday.component";
import { WednesdayComponent } from "./wednesday/wednesday.component";

@NgModule({
  declarations: [
    ScheduleComponent,
    MondayComponent,
    TuesdayComponent,
    WednesdayComponent,
    ThursdayComponent,
    FridayComponent,
    SaturdayComponent,
    SundayComponent
  ],
  imports: [
    SharedModule,
    RouterModule
  ]
})

export class ScheduleModule {}
