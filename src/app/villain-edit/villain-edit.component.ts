import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd } from '@angular/router';

@Component({
  selector: 'app-villain-edit',
  templateUrl: './villain-edit.component.html',
  styleUrls: ['./villain-edit.component.css']
})
export class VillainEditComponent {
  // activedRoute: ActivatedRoute
  villainsName: string
  constructor(private activatedRoute: ActivatedRoute) {
    this.villainsName = activatedRoute.snapshot.params['name']
  }
}
