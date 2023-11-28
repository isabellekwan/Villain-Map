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

  onVillainDelete(villainId: string) {
      this.vs.delete(villainId);
      this.villains = this.vs.get(); // Update villains after deletion
  }

  ngOnInit(): void {
      this.villains = this.vs.get()
      console.log(this.villains)
  }
}
