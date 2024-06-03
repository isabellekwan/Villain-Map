import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Villain } from './models/villain.model';
import { StorageService } from "./storage.service";
import { LocationService } from './location.service';
import { tap, catchError, map } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { take } from 'rxjs/operators';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VillainService {
  villains: Villain[] = [];
  hashifyApiUrl = environment.hashifyApiUrl;
  expectedHash = environment.expectedHash;

  constructor(
    private StorageService: StorageService, 
    private LocationService: LocationService,
    private http: HttpClient,
    private router: Router) {
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

   verifyPassword(password: string): Observable<boolean> {
    return this.http.get<{ Digest: string }>(`${this.hashifyApiUrl}?value=${password}`).pipe(
      map((hashedPassword: { Digest: string }) => {
        return hashedPassword.Digest === this.expectedHash;
      }),
      catchError((error) => {
        console.log('Error verifying password: ', error);
        return of(false);
      }),
      take(1) // Ensure the observable completes after emitting a single value
    );
  }

   delete(name:string){
    const password = prompt('Enter your password:');
    if (password) {
      this.verifyPassword(password).subscribe((passwordVerified) => {
        if (passwordVerified) {
          const villainToDelete = this.villains.find(v => v.name === name);
          if (villainToDelete) {
            const locationName = villainToDelete.location;
            this.villains = this.villains.filter(v => v.name !== name);
            this.saveVillains();

            this.LocationService.updateLocationCount(locationName, -1);

            alert('Villain deleted successfully.');
          } else {
            alert('Villain not found.');
          }
        } else {
          alert('Password verification failed. Cannot delete.');
        }
      });
    } else {
      alert('Password not provided. Cannot delete.');
    }
  }

  saveVillains() {
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
