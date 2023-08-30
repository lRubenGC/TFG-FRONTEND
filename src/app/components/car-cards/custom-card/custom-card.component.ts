import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { customCarInterface } from 'src/app/models/cardTypes.interface';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { CarsService } from '../services/cars.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css', '../styles/car-cards.css']
})
export class CustomCardComponent implements OnInit {

  @Input() car!: customCarInterface;
  @Input() userProfile!: boolean;
  @Output() errorEvent = new EventEmitter<string>();

  constructor(
    private carsService: CarsService,
    private loaderService: LoaderService,
    private userService: UserService,
    private router: Router,
  ) {}

  async ngOnInit() {
    const userCreatorData = await this.userService.getUserData(this.car.userCreator);
    this.car.userCreator = userCreatorData.user.username;
  }

  voteCar() {
    // If user is logged in
    if (this.car.userId) {
      // If user has not voted the car
      if (!this.car.voted) {
        this.carsService.voteCustomCar(this.car.id, this.car.userId)
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
        this.carsService.unvoteCustomCar(this.car.id, this.car.userId)
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
      this.errorEvent.emit('GN_TOKEN_EXPIRED_VOTE');
    }
  }

  goToCreatorProfile() {
    this.router.navigate([`/user/profile/${this.car.userCreator}`]);
  }

  goToCustomCarView() {
    this.loaderService.startLoading();

    this.router.navigate([`/custom-cars/car/${this.car.id}`]);
  }

}
