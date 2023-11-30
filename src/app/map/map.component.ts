import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Location } from '../models/location.model';
import { LocationService } from '../location.service';
import { StorageService } from '../storage.service';
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
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements AfterViewInit {
  private map!: L.Map

  constructor(private locationService: LocationService, private StorageService: StorageService){}

  ngAfterViewInit(): void {
    const locations: Location[] = this.locationService.get();

    this.showMap()
    this.putLabels(locations)
  }

  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  putLabels(locations: Location[]) {
    setTimeout(() => {
      if (locations && locations.length > 0) {
        locations.forEach((location: Location) => {
          if(location.count > 0) {
            const marker = L.marker([location.latitude, location.longitude]).addTo(this.map);
          marker.bindPopup(`<b>${location.name}</b><br />${location.count} nuisance reports`).openPopup();
          } 
        });
      }
    }, 500); 
  }
}


