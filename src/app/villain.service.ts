import { Injectable } from '@angular/core';
import { Villain } from './models/villain.model';

@Injectable({
  providedIn: 'root'
})
export class VillainService {
  villains: Villain[]
  constructor() {
    this.villains = []
   }

   get(): Villain[] {
    return this.villains
   }

   add(newVillain:any){
    newVillain.added_on = (new Date()).getTime()
    this.villains.push(newVillain)
    //update villain-list on storage
    console.log(this.villains)
   }

   delete(del_villain:string){
    this.villains = this.villains.filter(v => v.id.toString() !== del_villain);
    //update villain-list on storage
    return this.villains
   }
}
