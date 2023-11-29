import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VillainService } from '../villain.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { Villain } from "../models/villain.model";
import { Location } from "../models/location.model";

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent {
  form: FormGroup

  previousLocations: Location[];
  isNewLocationSelected: boolean = false;

  constructor(private vs: VillainService, private ss: StorageService, private router: Router){
    this.previousLocations = [];
    
    let formControls = {
      name: new FormControl('',[
        Validators.required,    
      ]),
      reportname: new FormControl('',[
        Validators.required,    
      ]),
      reportnumber: new FormControl('',[
        Validators.required,    
      ]),
      imageUrl: new FormControl(),
      location: new FormControl(),// make required when it works
      extraDetails: new FormControl(),
    }
    this.form = new FormGroup(formControls)
  }

  onSubmit(form: any) {
    if (this.form.valid) {
      const formData = this.form.value;
  
      const newVillain: Villain = {
        id: Villain.num,
        name: formData.name,
        reportName: formData.reportname,
        reportNumber: formData.reportnumber,
        location: formData.location,
        time: new Date(),
        imageUrl: formData.imageUrl, //image not found picture
        extraDetails: formData.extraDetails,
        status: 'open'
      };
  
      this.vs.add(newVillain); 

  
      this.router.navigate(['/home']); // Navigate to home after submission
  }
}

  onLocationSelected(value:any) {
      const selectedValue = value.target.value;
  
      if (selectedValue === 'new') {
        this.isNewLocationSelected = true;
        // make new location

      } else {
        // Handle selection of a previous location
        const selectedLocation = this.previousLocations.find(location => location.name === selectedValue);
        if (selectedLocation) {
        //add to nuisance count
      }
      // Reset the new location fields if previously shown
      this.resetNewLocationFields();
    }
  }

  resetNewLocationFields() {
    // Reset the fields for new location entry
    this.isNewLocationSelected = false;
    // Reset the values of new location fields to empty or default
    // ...
  }

}
