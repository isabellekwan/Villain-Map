import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

export class ReportComponent implements OnInit{
  form!: FormGroup

  previousLocations: Location[];
  isNewLocationSelected: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private vs: VillainService,
    private ss: StorageService,
    private ls: LocationService,
    private router: Router
  ) {
    this.previousLocations = this.ls.get();
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      reportname: ['', [Validators.required]],
      reportnumber: ['', [Validators.required]],
      imageUrl: [''],
      location: ['', [Validators.required]],
      extraDetails: ['', [Validators.required]]
    });
  }

  onSubmit(form: any) {
    if (this.form.valid) {
      const formData = this.form.value;
      const selectedLocationName: string = formData.location;

      console.log(formData);
      console.log("THE FORM LOCATION: ", formData.location)
  
      const newVillain: Villain = {
        name: formData.name,
        reportName: formData.reportname,
        reportNumber: formData.reportnumber,
        location: selectedLocationName,
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
  }

}
