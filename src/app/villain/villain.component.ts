import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VillainService } from '../villain.service';
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
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const villainName = params.get('name');
      if (villainName) {
        setTimeout(() => {
        this.villain = this.villainService.getVillainByName(villainName);
      }, 500);
      }
    });
  }

  changeStatus(){
    const password = prompt('Enter your password:');
    if (password) {
      this.villainService.verifyPassword(password).subscribe((passwordVerified) => {
        if (passwordVerified) {
          if (this.villain) {
            // Change the status based on the current status
            if (this.villain.status === 'open') {
              this.villain.status = 'resolved';
            } else if (this.villain.status === 'resolved') {
              this.villain.status = 'open';
            }
            // Save the updated status
            this.villainService.saveVillains();
          }
        } else {
          alert('Password verification failed. Cannot change status.');
        }
      });
    } else {
      alert('Password not provided. Cannot change status.');
    }
  }

  isValidImageUrl(url: string): boolean {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth !== 0;
  }
}