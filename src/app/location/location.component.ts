import { Component, OnInit } from '@angular/core';
import { LocationService } from '../location.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';

import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25,41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  private map!: L.Map;
  private marker: any;
  newLocationName: string = '';
  newLongitude: number = 0;
  newLatitude: number = 0;

  constructor(private locationService: LocationService, private StorageService: StorageService, private Router: Router ){}

  ngOnInit(): void {
    this.showMap();
    this.showClick();
  }

  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);
  }

  showClick() {
    this.map.on ('click', (e) => {
      this.onMapClick(e,this.map);
    })

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  onMapClick(e: any, map: any): void {
    if (this.marker) {
      this.map.removeLayer(this.marker); // Remove existing marker
    }
    // Get latitude and longitude from the clicked location
    this.newLatitude = e.latlng.lat;
    this.newLongitude = e.latlng.lng;

    // Place a marker at the clicked location
    this.marker = L.marker([this.newLatitude, this.newLongitude]).addTo(this.map);
  }

  addNewLocation(): void {
    if (!this.newLatitude || !this.newLongitude) {
      alert('Please select a location on the map by clicking before adding.');
      return;
    }

    if (this.newLocationName === '') {
      alert('Please enter a valid location name.');
      return;
    }

    const locationExists = this.locationService.checkLocationExists(this.newLocationName);
    if (locationExists) {
      alert('Location name already exists. Please choose a different name.');
      return;
    }

    const newLocation = this.locationService.createNewLocation(
      this.newLocationName,
      this.newLongitude,
      this.newLatitude,
    );

    this.locationService.add(newLocation);
    this.StorageService.putLocations(this.locationService.get())
      .subscribe((response) => {
        console.log('Locations added and server updated:', response);
      });

    this.Router.navigate(['villain/report']);
  }
}
