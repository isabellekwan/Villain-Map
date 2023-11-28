import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-villain',
  templateUrl: './villain.component.html',
  styleUrls: ['./villain.component.css']
})
export class VillainComponent {
  @Input() villain:any
  @Output() delete = new EventEmitter()

  constructor(private router: Router){
  }
  
  onDelete(evt:any,vil_to_be_deleted:string) {
    evt['delete_villain'] = vil_to_be_deleted
    //console.log(evt)
    // send it to the parent component
    this.delete.emit(evt)
  }

  onEdit(){
    this.router.navigate(['/person',this.villain.name])
  }
}
