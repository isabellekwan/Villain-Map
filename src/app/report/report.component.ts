import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VillainService } from '../villain.service';
import { StorageService } from '../storage.service';
import { LocationService } from '../location.service'
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

  constructor(private vs: VillainService, private ss: StorageService, private ls: LocationService, private router: Router){
    this.previousLocations = this.ls.get();
    
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
      const selectedLocationName = formData.location;

      console.log(formData);
      console.log("THE FORM LOCATION: ", formData.location)
  
      const newVillain: Villain = {
        name: formData.name,
        reportName: formData.reportname,
        reportNumber: formData.reportnumber,
        location: formData.location,
        time: new Date(),
        imageUrl: formData.imageUrl, //image not found picture
        extraDetails: formData.extraDetails,
        status: 'open'
      };

      if (!this.isNameUnique(newVillain.name)) {
        // Show an alert or any other appropriate message when the name is not unique
        alert('This villain has already been reported! Try another name.');
        return;
      }

      this.vs.add(newVillain); 
      this.ss.putVillains(this.vs.get())

      const selectedLocation = this.previousLocations.find(location => location.name === selectedLocationName);
        if (selectedLocation) {
          // Increment count for the selected location
          selectedLocation.count++; 
          // Update location count in Server Storage
          this.ss.putLocations(this.ls.get()).subscribe((response) => {
            console.log('Location server updated:', response);
          });
      }
  
      this.router.navigate(['/home']); // Go back to home when submitted
  }
}

isNameUnique(name: string): boolean {
  const villains = this.vs.get();
  // Check if the name already exists in the list of villains
  return !villains.some(villain => villain.name === name);
}

  onLocationSelected(value:any) {
      const selectedValue = value.target.value;
  
      if (selectedValue === 'new') {
        this.router.navigate(['/newlocation'])
      }
      // Reset the new location fields if previously shown
      this.resetNewLocationFields();
    }


  resetNewLocationFields() {
    // Reset the fields for new location entry
    this.isNewLocationSelected = false;
    // Reset the values of new location fields to empty or default
    // ...
  }

}
