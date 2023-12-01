import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VillainService } from '../villain.service';
import { StorageService } from '../storage.service';
import { LocationService } from '../location.service';
import { Villain } from '../models/villain.model';
import { Location } from '../models/location.model';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.css']
})
export class VillainListComponent implements OnInit{
  villains: Villain[]
  sortColumn: string = '';
  sortDirection: string = 'asc';

  constructor(
    private http: HttpClient, 
    private villainService:VillainService, 
    private storageService: StorageService,
    private locationService: LocationService){
    this.villains = villainService.get();
  }

  // getVillains(): void {
  //   this.storageService.getVillains()
  //     .subscribe((villains: Villain[]) => this.villains = villains);
  // }

  ngOnInit(): void {
      console.log(this.villainService.get())
  }

  addVillain(newVillain: Villain): void {
    this.villainService.add(newVillain);
    this.storageService.putVillains(this.villainService.get())
      .subscribe((response) => {
        console.log('Villain added and server updated:', response);
      });
  }

  deleteVillain(villainName: string) {
    const villain = this.villainService.getVillainByName(villainName); 
    this.villainService.delete(villainName);
    this.storageService.putVillains(this.villainService.get())
      .subscribe((response) => {
        console.log('Villain deleted and server updated', response)
      })
    const password: string | null = prompt('Enter password:'); // Prompt for password

    // // Check if the provided password matches the stored hash for deletion
    // const providedHash = 'fcab0453879a2b2281bc5073e3f5fe54';

    // const md5HashOfInput = Crypto.createHash('md5').update(password || '').digest('hex');

    // if (md5HashOfInput === providedHash) {
    //   // If password matches, proceed with deletion
    //   this.villainService.delete(villainId);

    //   this.storageService.putVillains(this.villainService.get()).subscribe((response) => {
    //     console.log('Villain deleted and server updated:', response);
    //   });
    // } else {
    //   // Handle incorrect password
    //   console.log('Password incorrect. Villain not deleted.');
    // }
}

sortTable(column: string) {
  // Toggle sort direction if same column is clicked
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }

  // Sort the villains array based on the selected column and direction
  this.villains.sort((a, b) => {
    const aValue = this.getValueForColumn(a, column);
    const bValue = this.getValueForColumn(b, column);

    if (aValue < bValue) {
      return this.sortDirection === 'asc' ? -1 : 1;
    } else if (aValue > bValue) {
      return this.sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

getValueForColumn(villain: Villain, column: string): any {
  switch (column) {
    case 'location':
      return villain.location;
    case 'name':
      return villain.name;
    case 'time':
      return villain.time;
    case 'status':
      return villain.status;
    default:
      return ''; // Return default value for unknown column
  }
}
}
