import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Villain } from './models/villain.model';
import { Location } from './models/location.model';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getVillains(): Observable<any> {
    const villains = this.http.get<Object>(`${this.apiUrl}villains/`);
    return villains;
  }

  getLocations(): Observable<any> {
    const locations = this.http.get<Object>(`${this.apiUrl}locations/`);
    return locations;
  }

  putVillains(villainData: Villain[]): Observable<any> {

    const villainJSON = {
      'key': 'villains',
      'data': villainData
    }
    console.log(`${this.apiUrl}villains/`);
    return this.http.put(`${this.apiUrl}villains/`, villainJSON);
  }

  putLocations(locationData: Location[]): Observable<any> {

    const locationJSON = {
      'key': 'locations',
      'data': locationData
    }
    
    return this.http.put<Location[]>(`${this.apiUrl}locations/`, locationJSON);
  }
}
