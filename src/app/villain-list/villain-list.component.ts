import { Component, OnInit } from '@angular/core';
import { VillainService } from '../villain.service';
import { StorageService } from '../storage.service';
import { Villain } from '../models/villain.model';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.css']
})
export class VillainListComponent implements OnInit{
  villains: Villain[]

  constructor(private villainService:VillainService, private storageService: StorageService){
    this.villains = []
  }

  getVillains(): void {
    this.storageService.getVillains()
      .subscribe((villains: Villain[]) => this.villains = villains);
  }

  ngOnInit(): void {
      console.log(this.getVillains())
      this.getVillains();
  }

  // addVillain(newVillain: Villain): void {
  //   this.villainService.add(newVillain);
  //   this.storageService.putVillains(this.villainService.get())
  //     .subscribe((response) => {
  //       console.log('Villain added and server updated:', response);
  //     });
  // }

  deleteVillain(villainId: string) {
    this.villainService.delete(villainId);

    this.storageService.putVillains(this.villainService.get())
    .subscribe((response) => {
      console.log('Villain deleted and server updated:', response);
    });
}
}
