import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CalendarModule, DateAdapter } from "angular-calendar";
import { SharedModule } from "../shared/shared.module";
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'

import { ScheduleComponent } from "./schedule.component";


@NgModule({
  declarations: [
    ScheduleComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
    CalendarModule.forRoot({
    provide: DateAdapter,
    useFactory: adapterFactory
    })
  ]
})

export class ScheduleModule {}
