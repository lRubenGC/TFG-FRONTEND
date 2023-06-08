import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { customCarInterface } from 'src/app/models/cardTypes.interface';
import { CustomCarsService } from '../custom-cars.service';

@Component({
  selector: 'app-custom-car-detailed',
  templateUrl: './custom-car-detailed.component.html',
  styleUrls: ['./custom-car-detailed.component.css'],
})
export class CustomCarDetailedComponent implements OnInit {
  car!: customCarInterface;
  error = false;
  errorMsg = '';

  currentImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private carService: CustomCarsService,
    ) {}

  ngOnInit(): void {
    const carId = this.route.snapshot.paramMap.get('carId');
    this.carService.getCarById(Number(carId)).subscribe(
      (res) => {
        this.car = {
          ...res.car,
          imgs: res.car.imgs.split(',')
        }
      },
      (error) => this.enableErrorMsg(error)
    );
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

  enableErrorMsg(msg: string | any) {
    this.error = true;
    if (typeof msg === 'string') {
      this.errorMsg = msg;
    } else {
      this.errorMsg = 'GN_UNEXPECTED_ERROR';
    }
  }
}
