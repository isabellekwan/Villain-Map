import { Component, OnInit } from '@angular/core';
import { VillainService } from '../villain.service';

@Component({
  selector: 'app-villain-list',
  templateUrl: './villain-list.component.html',
  styleUrls: ['./villain-list.component.css']
})
export class VillainListComponent {
  villains:any[]
  query: string
  constructor(private vs:VillainService){
    this.query = ''
    this.villains = []
    // this.villains = [
    //   {
    //     name: 'john',
    //     instructor: false,
    //     added_on: new Date().getTime()
    //   },
    //   {
    //     name: 'bobby',
    //     instructor: false,
    //     added_on: new Date().getTime()
    //   },
    //   {
    //     name: 'jenny',
    //     instructor: true,
    //     added_on: new Date().getTime()
    //   },
    //   {
    //     name: 'jane',
    //     instructor: true,
    //     added_on: new Date().getTime()
    //   },
    //   {
    //     name: 'steve',
    //     instructor: true,
    //     added_on: new Date().getTime()
    //   }
    // ]
  }

  onPersonDelete(evt:any) {
    let delete_person = evt['delete_person'] 
    // this.people = this.people.filter((p) => p.name != delete_person)
    this.villains = this.vs.delete(delete_person)
  }

  ngOnInit(): void {
      this.villains = this.vs.get()
  }
}
