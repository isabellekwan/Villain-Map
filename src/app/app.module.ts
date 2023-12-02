import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ReportComponent } from './report/report.component';
import { VillainComponent } from './villain/villain.component';
import { VillainListComponent } from './villain-list/villain-list.component';

import { VillainService } from './villain.service';
import { HomeComponent } from './home/home.component';
import { StorageService } from './storage.service';
import { LocationComponent } from './location/location.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ReportComponent,
    VillainComponent,
    VillainListComponent,
    HomeComponent,
    LocationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'home', component: HomeComponent },
    ]),
    HttpClientModule
  ],
  providers: [VillainService, StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
