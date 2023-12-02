import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { VillainListComponent } from './villain-list/villain-list.component';
import { ReportComponent } from './report/report.component';
import { VillainComponent } from './villain/villain.component';
import { HomeComponent } from './home/home.component';
import { LocationComponent } from './location/location.component';

const appRoutes:Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newlocation', component: LocationComponent},
  { path: 'villain', component: VillainListComponent },
  { path: 'villain/report', component: ReportComponent },
  { path: 'villain/:name', component: VillainComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
