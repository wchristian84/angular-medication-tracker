import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { AddMedComponent } from "./add-med/add-med.component";
import { CurrentMedsComponent } from "./current-meds/current-meds.component";
import { EditMedComponent } from "./edit-med/edit-med.component";
import { MedicationsComponent } from "./medications.component";
import { PastMedsComponent } from "./past-meds/past-meds.component";

@NgModule({
  declarations: [
    AddMedComponent,
    CurrentMedsComponent,
    EditMedComponent,
    PastMedsComponent,
    MedicationsComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: []
})

export class MedicationsModule {}
