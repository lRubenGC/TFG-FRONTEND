import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomCarsService } from '../custom-cars.service';
import { customCarInterface } from 'src/app/models/cardTypes.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { isValidYear } from 'src/app/helpers/custom-car-validators';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-edit-custom-car',
  templateUrl: './edit-custom-car.component.html',
  styleUrls: ['./edit-custom-car.component.css']
})
export class EditCustomCarComponent implements OnInit {

  userToken!: tokenObject;

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

  updateButtonDisabled: boolean = false;


  constructor(
    private customCarsService: CustomCarsService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
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

  async ngOnInit() {
    this.userToken = await decodeToken();

    this.route.paramMap.subscribe(params => {
      const carId = Number(params.get('carId'));

      if (carId && !isNaN(carId)) {
        this.customCarsService.getCarById(carId).subscribe(
          (res) => {
            const car = res.car;
            car.imgs = car.imgs.split(',');

            this.carData = car;

            this.editCarForm.patchValue({
              car_id: car.car_id,
              model_name: car.model_name,
              year: car.year,
              brand: car.brand,
            })
          }
        )
      }
    });
  }

  ngAfterContentInit() {
    this.loaderService.stopLoading();
  }

  async submitForm() {
    // restart notifications
    this.formError = false;
    this.formSuccess = false;

    // disable submit button
    this.updateButtonDisabled = true;

    // data of user
    const carData = this.carData;
    
    // data of form
    const car_id = this.editCarForm.get('car_id')?.value;
    const model_name = this.editCarForm.get('model_name')?.value;
    const year = this.editCarForm.get('year')?.value;
    const brand = this.editCarForm.get('brand')?.value;

    const bodyRequest: any = {}

    // validations
    if (car_id !== carData.car_id) {
      if (car_id.length < 3) {
        this.errorMsg = 'POST_CUSTOM_CAR_BAD_ID';
        this.formError = true;
        this.formSuccess = false;
      
        // activate submit button
        this.updateButtonDisabled = false;

        return;
      }

      bodyRequest.car_id = car_id;
    }

    if (model_name !== carData.model_name) {
      if (model_name.length < 2) {
        this.errorMsg = 'POST_CUSTOM_CAR_BAD_MODEL';
        this.formError = true;
        this.formSuccess = false;
      
        // activate submit button
        this.updateButtonDisabled = false;
        return;
      }

      bodyRequest.model_name = model_name;
    }

    if (year !== carData.year) {
      if (year.length > 0) {
        if (!isValidYear(year)) {
          this.errorMsg = 'POST_CUSTOM_CAR_BAD_YEAR';
          this.formError = true;
          this.formSuccess = false;
        
          // activate submit button
          this.updateButtonDisabled = false;
          return;
        }
  
        bodyRequest.year = year;
      }
    }

    if (brand !== carData.brand) {
      if (brand.length > 0) {
        if (brand.length < 3) {
          this.errorMsg = 'POST_CUSTOM_CAR_BAD_BRAND';
          this.formError = true;
          this.formSuccess = false;
        
          // activate submit button
          this.updateButtonDisabled = false;
          return;
        }
  
        bodyRequest.brand = brand;
      }
    }

    if (Object.keys(bodyRequest).length === 0 && this.images[0] === null && this.images[1] === null && this.images[2] === null && this.images[3] === null) {
      this.errorMsg = 'CONFIG_EMPTY_VALUES';
      this.formError = true;
      this.formSuccess = false;

      // activate submit button
      this.updateButtonDisabled = false;
      return;
    }

    this.formError = false;

    try {
      this.loaderService.startLoading();
      // update imgs
      if (this.images[0] !== null || this.images[1] !== null || this.images[2] !== null || this.images[3] !== null) {
        await this.updateImgs();
      }
      
      // update data (username | email | password)
      if (Object.keys(bodyRequest).length > 0) {
        await this.customCarsService.updateCustomCar(this.userToken.userId!, this.carData.id, bodyRequest).toPromise();
        this.successMsg = 'CONFIG_USER_UPDATED';
        this.formSuccess = true;
      }

      // activate submit button
      this.updateButtonDisabled = false;
      
    } catch (err: any) {
      console.error(err);
      
      if (err.error.errors[0].param === 'username') {
        this.errorMsg = 'USERNAME_IN_USE';
        this.formError = true;
        return;
      }
  
      if (err.error.errors[0].param === 'email') {
        this.errorMsg = 'EMAIL_IN_USE';
        this.formError = true;
        return;
      }
    } finally {
      this.loaderService.stopLoading();
      location.reload();
    }
  }

  async updateImgs() {
    // object
    const formData = new FormData();
  
    // if an img is in input, adds it to the object
    this.images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index}`, image);
      }
    });
  
    try {
      let imgUploaded = false;

      // loop uploading img if exists
      if (this.userToken.hasToken && this.userToken.userId) {
        for (let i = 0; i < this.images.length; i++) {
          const file = formData.get(`image${i}`);
          if (file instanceof File) {
            imgUploaded = true;
            await this.customCarsService.uploadImg(this.userToken.userId, this.carData.id, file).toPromise();
  
          }
        }
  
        if (imgUploaded) {
          this.successMsg = 'CUSTOM_CAR_IMG_UPLOADED';
          this.formSuccess = true;
        }
      }

    } catch (err) {
      console.error(err);
    }
  }

  deleteImg(event: any, type: number) {
    this.formError = false;
    this.formSuccess = false;

    if (event.explicitOriginalTarget.className !== 'button-delete-config' && event.explicitOriginalTarget.className !== 'fas fa-trash') {
      return;
    }

    if (!this.deleteImgValidations(type)) {
      return;
    }

    switch (type) {
      case 0:
        this.deleteImgApi(0);
        break;
      case 1:
        this.deleteImgApi(1);
        break;
      case 2:
        this.deleteImgApi(2);
        break;
      case 3:
        this.deleteImgApi(3);
        break;
    }
  }

  // returns false if imgs are not valid
  deleteImgValidations(type: number): boolean {
    if (type === 0 && (this.carData.imgs[0] === '' || this.carData.imgs[0] === undefined)) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return false;
    } else if (type === 1 && (this.carData.imgs[1] === '' || this.carData.imgs[1] === undefined)) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return false;
    } else if (type === 2 && (this.carData.imgs[2] === '' || this.carData.imgs[2] === undefined)) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return false;
    } else if (type === 3 && (this.carData.imgs[3] === '' || this.carData.imgs[3] === undefined)) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return false;
    }

    return true;
  }


  async deleteImgApi(index: number) {
    try {
      this.loaderService.startLoading();
      const url = this.carData.imgs[index].split('/');
      const img = url[url.length - 1].split('.')[0];

      await this.customCarsService.deleteImg(this.userToken.userId!, this.carData.id, img).toPromise();
      this.successMsg = 'CONFIG_IMG_DELETED';
      this.formSuccess = true;
      
      switch (index) {
        case 0:
          this.img1Deleted = true;
          break;
        case 1:
          this.img2Deleted = true;
          break;
        case 2:
          this.img3Deleted = true;
          break;
        case 3:
          this.img4Deleted = true;
          break;
      }

      } catch (err) {
        console.error(err);
      } finally {
      this.loaderService.stopLoading();
      }
  }

  onImageChanged(index: number, file: File | null) {
    this.formError = false;
    this.images[index] = file;
  }


  goBack() {
    this.loaderService.startLoading();
    this.router.navigate([`/custom-cars/car/${this.carData.id}`]);
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
