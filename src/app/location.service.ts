import { Injectable } from '@angular/core';
import { Location } from './models/location.model';
import { StorageService } from "./storage.service";
import { tap, catchError } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  locations: Location[] = [];

  constructor(private StorageService: StorageService) {
    //referenced code from villain service
    this.StorageService.getLocations().pipe(
    tap((storedLocations) => {
      if (storedLocations) {
        storedLocations.data.forEach((location: Location) => {
          this.locations.push(location);
        });
        console.log("Loaded locations from storage: ", this.locations);
        console.log(typeof(this.locations))
      }
    }),
    catchError((error) => {
      console.log("Error loading locations from storage: ", error);
      return of(null);
    })
  ).subscribe();
}

  get(): Location[] {
    return this.locations;
  }

  createNewLocation(name: string, longitude: number, latitude: number): Location {
    return new Location(name, longitude, latitude);
  }

  add(newLocation: Location){
    this.locations.push(newLocation);

    this.StorageService.putLocations(this.locations).pipe(
      tap(() => console.log("Saved locations to storage")),
      catchError((error) => {
        console.log("Error saving...", error);
        return of(null);
      })
    ).subscribe()
    console.log(this.locations)
   }

   updateLocationCount(locationName: string, change: number): void {
    const locationToUpdate = this.locations.find(l => l.name === locationName);
    console.log("Location to update:" + locationToUpdate)
    if (locationToUpdate) {
      if (locationToUpdate.count === 1 && change === -1) {
        // Remove location if there's only one instance and it's being decremented
        this.locations = this.locations.filter(l => l.name !== locationName);
      } else {
        locationToUpdate.count += change;
      }
    }
    this.StorageService.putLocations(this.locations).pipe(
      tap(() => console.log("Saved locations to storage")),
      catchError((error) => {
        console.log("Error saving...", error);
        return of(null);
      })
    ).subscribe()
    console.log(this.locations)
   }
}

