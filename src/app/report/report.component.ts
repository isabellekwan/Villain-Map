import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VillainService } from '../villain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent {
  form: FormGroup
  constructor(private vs: VillainService, private router: Router){
    let formControls = {
      name: new FormControl('',[
        Validators.required,
        Validators.minLength(4)
        
      ]),
      instructor: new FormControl(),
      age: new FormControl()
    }
    this.form = new FormGroup(formControls)
  }

  onSubmit(newPerson:any) {
    //console.log(newPerson)
    this.vs.add(newPerson)
    this.router.navigate(["/villains"])
  }
}
