import { Injectable } from '@angular/core';
import { Villain } from './models/villain.model';
import { StorageService } from "./storage.service";
import { tap, catchError } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class VillainService {
  villains: Villain[] = [];

  constructor(private StorageService: StorageService) {
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

    this.StorageService.putVillains(this.villains).pipe(
      tap(() => console.log("Saved villains to storage")),
      catchError((error) => {
        console.log("Error saving...", error);
        return of(null);
      })
    ).subscribe()
    console.log(this.villains)
   }

   delete(del_villain:string){
    this.villains = this.villains.filter(v => v.id.toString() !== del_villain);
    //update villain-list on storage
    return this.villains
   }

   getVillainById(id:number) {
    
   }
}
