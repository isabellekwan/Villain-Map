import { Component, OnInit } from '@angular/core';
import { VillainService } from '../villain.service';
import { Villain } from '../models/villain.model';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.css']
})
export class VillainListComponent {
  villains: Villain[]
  query: string
  constructor(private vs:VillainService){
    this.query = ''
    this.villains = []
  }

  onVillainDelete(evt:any) {
    let delete_villain = evt['delete_villain'] 
    // this.villain = this.villain.filter((p) => p.name != delete_villain)
    this.villains = this.vs.delete(delete_villain)
  }

  ngOnInit(): void {
      this.villains = this.vs.get()
      console.log(this.villains)
  }
}
