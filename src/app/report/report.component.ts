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

  onSubmit(newVillain:any) {
    //console.log(newVillain)
    this.vs.add(newVillain)
    this.router.navigate(["/"])
  }

  previousLocations: any[] = []; // Array of previous locations
  isNewLocationSelected: boolean = false;

  onLocationSelected(event: Event) {
    const target = event.target as HTMLSelectElement;
    if (target instanceof HTMLSelectElement) {
      const selectedValue = target.value;
  
      if (selectedValue === 'new') {
        this.isNewLocationSelected = true;
      } else {
        // Handle selection of a previous location
        const selectedLocation = this.previousLocations.find(location => location.id === selectedValue);
        if (selectedLocation) {
        //add to nuisance count
      }
      // Reset the new location fields if previously shown
      this.resetNewLocationFields();
    }
  }
}

  resetNewLocationFields() {
    // Reset the fields for new location entry
    this.isNewLocationSelected = false;
    // Reset the values of new location fields to empty or default
    // ...
  }
}
