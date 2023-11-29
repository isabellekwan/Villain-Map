import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Villain } from './models/villain.model';
import { Location } from './models/location.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private apiUrl = "https://272.selfip.net/accounts/rbuMgJ2mTt/manage/h7EDf3FwiT5XucZ9r7UEZcT2lms6CP/collections/NCT/documents/";

  constructor(private http: HttpClient) {}

  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(`${this.apiUrl}villains`);
  }

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.apiUrl}locations`);
  }

  putVillains(villainData: Villain[]): Observable<Villain[]> {
    return this.http.put<Villain[]>(`${this.apiUrl}villains`, villainData);
  }

  putLocations(locationData: Location[]): Observable<Location[]> {
    return this.http.put<Location[]>(`${this.apiUrl}locations`, locationData);
  }
}
