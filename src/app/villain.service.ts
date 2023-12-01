import { Injectable } from '@angular/core';
import { Villain } from './models/villain.model';
import { Location } from './models/location.model';
import { StorageService } from "./storage.service";
import { LocationService } from './location.service';
import { tap, catchError } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class VillainService {
  villains: Villain[] = [];

  constructor(private StorageService: StorageService, private LocationService: LocationService) {
    //make observable into correct object type
    this.StorageService.getVillains().pipe(
    tap((storedVillains) => {
      if (storedVillains) {
        storedVillains.data.forEach((villain: Villain) => {
          this.villains.push(villain);
        });
        console.log("Loaded villains from storage: ", this.villains);
        console.log(typeof(this.villains))
      }
    }),
    catchError((error) => {
      console.log("Error loading villains from storage: ", error);
      return of(null);
    })
  ).subscribe();
}

   get(): Villain[] {
    return this.villains;
   }

   add(newVillain: Villain){
    this.villains.push(newVillain);
    this.saveVillains();
   }

   delete(name:string){
    const villainToDelete = this.villains.find(v => v.name === name);
    if (villainToDelete) {
      const locationName = villainToDelete.location;
      this.villains = this.villains.filter(v => v.name !== name);
      this.saveVillains();

      this.LocationService.updateLocationCount(locationName, -1);
    }

    return this.villains;
  }

  private saveVillains() {
    this.StorageService.putVillains(this.villains).pipe(
      tap(() => console.log("Saved villains to storage")),
      catchError((error) => {
        console.log("Error saving villains: ", error);
        return of(null);
      })
    ).subscribe();
  }

   getVillainByName(name: string) {
    return this.villains.find(villain => villain.name === name);
   }
}
