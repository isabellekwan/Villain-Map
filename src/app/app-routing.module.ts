import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VillainListComponent } from './villain-list/villain-list.component';
import { ReportComponent } from './report/report.component';
import { VillainEditComponent } from './villain-edit/villain-edit.component';

const appRoutes:Routes = [
  { path: 'villain', component: VillainListComponent },
  { path: 'villain/report', component: ReportComponent },
  { path: 'villain/:name', component: VillainEditComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
