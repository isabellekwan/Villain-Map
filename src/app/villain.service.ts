import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VillainService {
  villains: any[] // change to villain class
  constructor() {
    // call the data service for the people
    this.villains = []
   }

   get() {
    return this.villains
   }

   add(newVillain:any){
    newVillain.added_on = (new Date()).getTime()
    this.villains.push(newVillain)
    //update villain-list on storage
    console.log(this.villains)
   }

   delete(del_villain:string){
    this.villains = this.villains.filter((p) => p.name != del_villain)
    //update villain-list on storage
    return this.villains
   }
}
