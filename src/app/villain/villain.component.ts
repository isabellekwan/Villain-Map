import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VillainService } from '../villain.service';
import { Router } from '@angular/router';
import { Villain } from '../models/villain.model';

@Component({
  selector: 'app-villain',
  templateUrl: './villain.component.html',
  styleUrls: ['./villain.component.css']
})
export class VillainComponent implements OnInit {
  villain: Villain | undefined;

  constructor(
    private route: ActivatedRoute,
    private villainService: VillainService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Fetch the name parameter from the route
      const villainName = params.get('name');
      if (villainName) {
        // Use the VillainService to get the specific villain by name
        this.villain = this.villainService.getVillainByName(villainName);
      }
    });

  // onEdit(){
  //   this.router.navigate(['/person',this.villain.name])
  // }
}
}
