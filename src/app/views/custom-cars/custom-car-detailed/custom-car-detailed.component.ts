import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { customCarInterface } from 'src/app/models/cardTypes.interface';
import { CustomCarsService } from '../custom-cars.service';
import { UserService } from 'src/app/services/user.service';
import { CarsService } from 'src/app/components/car-cards/services/cars.service';
import { decodeToken } from 'src/app/helpers/generics';
import { forkJoin } from 'rxjs';
import { mapAndSortCustomCars } from 'src/app/helpers/map-cars';

@Component({
  selector: 'app-custom-car-detailed',
  templateUrl: './custom-car-detailed.component.html',
  styleUrls: ['./custom-car-detailed.component.css'],
})
export class CustomCarDetailedComponent implements OnInit {
  
  userToken = decodeToken();

  car!: customCarInterface;
  error = false;
  errorMsg = '';

  isUserCreatorViewer = false;

  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private customCarsService: CustomCarsService,
    private router: Router,
    private userService: UserService,
    ) {}

  ngOnInit() {
    const carId = Number(this.route.snapshot.paramMap.get('carId'));

    if (carId && !isNaN(carId)) {
      this.getCustomCar(carId);
    } else {
      this.errorMsg = 'WRONG_CUSTOM_ID_CAR';
      this.error = true;
    }
  }

  getCustomCar(carId: number) {
    if (this.userToken.hasToken && this.userToken.userId) {
      forkJoin({
          car: this.customCarsService.getCarById(carId),
          userVotes: this.carsService.getUserVotes(this.userToken.userId),
      }).subscribe(({ car, userVotes }) => {
        this.userService.getUserData(car.car.userCreator).then(userCreatorData => {

          this.checkUserViewer(this.userToken.userId!, car.car.userCreator);

          this.car = {
            ...car.car,
            imgs: car.car.imgs.split(','),
            userCreator: userCreatorData.user.username,
            voted: userVotes.includes(car.car.id)
          }
        });
      }, (err) => {
          console.error(err);
      });
    } else {
        this.customCarsService.getCarById(carId).subscribe((res) => {
          this.userService.getUserData(res.car.userCreator).then(userCreatorData => {
            this.car = {
              ...res.car,
              imgs: res.car.imgs.split(','),
              userCreator: userCreatorData.user.username,
            }
          });
        }, (err) => {
            console.error(err);
        });
    }
  }


  checkUserViewer(userVisitorId: number, userCreatorId: number) {
    if (userVisitorId === userCreatorId) {
      this.isUserCreatorViewer = true;
    }
  }


  nextImage() {
    if (this.currentImageIndex < this.car.imgs.length - 2) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }
  

  prevImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.car.imgs.length - 2;
    }
  }


  goTo(route: string) {
    switch (route) {
      case 'userCreator':
        this.router.navigate([`/user/profile/${this.car.userCreator}`]);
        break;
      case 'goBack':
        this.router.navigate([`/custom-cars`]);
        break;
      case 'editCar':
        this.router.navigate([`/custom-cars/edit/${this.car.id}`]);
        break;
    }
  }


  voteCar() {
    // If user is logged in
    if (this.userToken.hasToken && this.userToken.userId) {
      // If user has not voted the car
      if (!this.car.voted) {
        this.carsService.voteCustomCar(this.car.id, this.userToken.userId)
          .subscribe(
            (res) => {
              this.car.upvotes++;
              this.car.voted = true;
            },
            (err) => {
              console.error(err);
            }
          );

      } else {
        this.carsService.unvoteCustomCar(this.car.id, this.userToken.userId)
          .subscribe(
            (res) => {
              this.car.upvotes--;
              this.car.voted = false;
            },
            (err) => {
              console.error(err);
            }
          )
      }
      // If user is not logged in
    } else {
      this.errorMsg = 'GN_TOKEN_EXPIRED_VOTE';
      this.error = true;
    }
  }


  enableErrorMsg(msg: string | any) {
    this.error = true;
    if (typeof msg === 'string') {
      this.errorMsg = msg;
    } else {
      this.errorMsg = 'GN_UNEXPECTED_ERROR';
    }
  }
}
