import { Component, OnInit } from '@angular/core';
import { CustomCarsService } from '../custom-cars.service';
import { customCarInterface } from 'src/app/models/cardTypes.interface';
import { CarsService } from 'src/app/components/services/cars.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { decodeToken } from 'src/app/helpers/generics';

@Component({
  selector: 'app-edit-custom-car',
  templateUrl: './edit-custom-car.component.html',
  styleUrls: ['./edit-custom-car.component.css']
})
export class EditCustomCarComponent implements OnInit {

  userToken = decodeToken();

  carData!: customCarInterface;

  images: File[] | null[] = [null, null, null, null];

  img1Deleted: boolean = false;
  img2Deleted: boolean = false;
  img3Deleted: boolean = false;
  img4Deleted: boolean = false;

  editCarForm!: FormGroup;

  error: boolean = false;
  errorMsg: string = '';
  formError: boolean = false;
  successMsg: string = '';
  formSuccess: boolean = false;

  isLoading: boolean = false;


  constructor(
    private customCarsService: CustomCarsService,
    private carsService: CarsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.editCarForm = this.formBuilder.group({
      car_id: ['', Validators.required],
      model_name: ['', [Validators.required]],
      year: ['', Validators.required],
      brand: ['', Validators.required],
      img_bg: [null]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const carId = Number(params.get('carId'));

      if (carId && !isNaN(carId)) {
        this.customCarsService.getCarById(carId).subscribe(
          (res) => {
            const car = res.car;
            car.imgs = car.imgs.split(',');

            this.carData = car;
          }
        )
      }
    });
  }


  submitForm() {

  }

  async deleteImg(event: any, type: number) {
    this.formError = false;
    if (event.pointerType === '') {
      return;
    }

    if (type === 0 && (this.carData.imgs[0] === '' || this.carData.imgs[0] === undefined )) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return;
    } else if (type === 1 && (this.carData.imgs[1] === '' || this.carData.imgs[1] === undefined )) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return;
    } else if (type === 2 && (this.carData.imgs[2] === '' || this.carData.imgs[2] === undefined )) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return;
    } else if (type === 3 && (this.carData.imgs[3] === '' || this.carData.imgs[3] === undefined )) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return;
    }

    if (type === 1) {
      try {
      this.isLoading = true;
      await this.customCarsService.deleteImg(this.userToken.userId!, this.carData.id, 'a').toPromise();
      this.successMsg = 'CONFIG_IMG_DELETED';
      this.formSuccess = true;
      this.img1Deleted = true;

      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    } else if (type === 2) {
      try {
        this.isLoading = true;
        await this.customCarsService.deleteImg(this.data.user.id, true).toPromise();
        this.successMsg = 'CONFIG_IMG_DELETED';
        this.formSuccess = true;
        this.img2Deleted = true;

        } catch (err) {
          console.error(err);
        } finally {
          this.isLoading = false;
        }
    }
  }

  onImageChanged(index: number, file: File | null) {
    this.formError = false;
    this.images[index] = file;
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
