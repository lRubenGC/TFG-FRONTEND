import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicCarsService } from '../../basic-cars-page/basic-cars.service';
import { PremiumCarsService } from '../../premium-cars-page/premium-cars.service';
import { decodeToken } from 'src/app/helpers/generics';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  // TODO: OBTENER ID DE USUARIO POR USERNAME
  userId = 1;

  basicCarsOwned = [];
  basicCarsWished = [];
  premiumCarsOwned = [];
  premiumCarsWished = [];

  username = '';
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private basicCarsService: BasicCarsService,
    private premiumCarsService: PremiumCarsService,
  ) { }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
    this.username = username;
    } else {
      this.error = true;
      this.router.navigate(['/']);
    }

    this.getUserPremiumCars();
    this.getUserBasicCars();
  }

  getUserBasicCars() {
    this.basicCarsService.getUserCars(this.userId).subscribe(res => {
      this.basicCarsOwned = res.carsOwned;
      this.basicCarsWished = res.carsWished;
    })
  }

  getUserPremiumCars() {
    this.premiumCarsService.getUserCars(this.userId).subscribe(res => {
      this.premiumCarsOwned = res.carsOwned;
      this.premiumCarsWished = res.carsWished;
    })
  }

}
