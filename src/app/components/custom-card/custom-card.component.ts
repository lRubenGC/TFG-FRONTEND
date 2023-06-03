import { Component, Input, OnInit } from '@angular/core';
import { customCarInterface } from 'src/app/models/cardTypes.interface';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css', '../styles/car-cards.css']
})
export class CustomCardComponent implements OnInit {

  @Input() car!: customCarInterface;

  constructor(
    private userService: UserService,
  ) {}

  async ngOnInit() {
    const userCreatorData = await this.userService.getUserData(this.car.userCreator);
    this.car.userCreator = userCreatorData.user.username;
  }

  upvote(car_id: number) {
    console.log(car_id);
  }


}
