import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ReportComponent } from './report/report.component';
import { VillainComponent } from './villain/villain.component';
import { VillainListComponent } from './villain-list/villain-list.component';

import { VillainService } from './villain.service';
import { VillainEditComponent } from './villain-edit/villain-edit.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ReportComponent,
    VillainComponent,
    VillainListComponent,
    VillainEditComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
    ])
  ],
  providers: [VillainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
