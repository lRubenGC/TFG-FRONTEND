import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { customCarInterface } from 'src/app/models/cardTypes.interface';

@Component({
  selector: 'custom-card',
  templateUrl: './custom-card.component.html',
  styleUrls: ['./custom-card.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CustomCardComponent {
  @Input() car!: customCarInterface;
  @Input() userProfile!: boolean;
  @Output() errorEvent = new EventEmitter<string>();

  constructor(private router: Router) {}

  voteCar() {}

  goToCreatorProfile() {
    this.router.navigate([`/user/profile/${this.car.userCreator}`]);
  }

  goToCustomCarView() {
    this.router.navigate([`/custom-cars/car/${this.car.id}`]);
  }
}
