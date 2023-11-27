import { Component, OnInit } from '@angular/core';
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

export class MapComponent implements OnInit {
  private map!: L.Map

  constructor(){}

  ngOnInit(): void {
    this.showMap()
    this.putLabels()

  }

  showMap() {
    this.map = L.map('mapid').setView([49.27, -123], 11);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> ',

    }).addTo(this.map);
  }

  putLabels() {
    L.marker([49.2276, -123.0076]).addTo(this.map)
  		.bindPopup("<b>Metortown</b><br />2 nuisance reports")
    L.marker([49.300054, -123.148155]).addTo(this.map)
    	.bindPopup("<b>Stanley Park</b><br />5 nuisance reports")
    L.marker([49.2781, -122.9199]).addTo(this.map)
    	.bindPopup("<b>SFU Burnaby</b><br />2 nuisance reports")

  }

  showClick() {
    this.map.on ('click', (e) => {
      alert("Lat,Lon: " + e.latlng.lat + ", " + e.latlng.lng)
    })
  }

}
