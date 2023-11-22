import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { CustomCarsService } from '../custom-cars.service';

@Component({
  selector: 'app-upload-custom-car-page',
  templateUrl: './upload-custom-car-page.component.html',
  styleUrls: ['./upload-custom-car-page.component.css'],
})
export class UploadCustomCarPageComponent implements OnInit {
  customCarForm!: UntypedFormGroup;

  @ViewChild('uploadButton', { static: true }) submitButtonRef!: ElementRef;

  userToken!: tokenObject;

  formError: boolean = false;
  errorMsg: string = '';
  formSuccess: boolean = false;
  successMsg: string = '';

  customCarUploaded: boolean = false;
  customCarId: number = 0;

  buttonDisabled: boolean = false;

  imageUploaded: boolean = false;

  constructor(
    private customCarsService: CustomCarsService,
    private formBuilder: UntypedFormBuilder,
    private router: Router
  ) {
    this.customCarForm = this.formBuilder.group({
      car_id: ['', Validators.required],
      model_name: ['', [Validators.required]],
      year: ['', Validators.required],
      brand: ['', Validators.required],
    });
  }

  async ngOnInit() {
    this.userToken = await decodeToken();
  }

  ngAfterContentInit() {}

  async submitForm() {
    if (this.userToken.hasToken) {
      // restart notifications
      this.formError = false;
      this.formSuccess = false;

      // disable submit button
      this.buttonDisabled = true;

      // data of form
      const car_id = this.customCarForm.get('car_id')?.value;
      const model_name = this.customCarForm.get('model_name')?.value;
      const year = this.customCarForm.get('year')?.value;
      const brand = this.customCarForm.get('brand')?.value;

      // validations
      if (car_id.length < 3) {
        this.errorMsg = 'POST_CUSTOM_CAR_BAD_ID';
        this.formError = true;
        this.formSuccess = false;

        // activate submit button
        this.buttonDisabled = false;
        return;
      }

      if (model_name.length < 3) {
        this.errorMsg = 'POST_CUSTOM_CAR_BAD_MODEL';
        this.formError = true;
        this.formSuccess = false;

        // activate submit button
        this.buttonDisabled = false;
        return;
      }

      if (year > 2025 || year < 1950) {
        this.errorMsg = 'POST_CUSTOM_CAR_BAD_YEAR';
        this.formError = true;
        this.formSuccess = false;

        // activate submit button
        this.submitButtonRef.nativeElement.disabled = false;
        return;
      }

      if (brand.length < 3) {
        this.errorMsg = 'POST_CUSTOM_CAR_BAD_BRAND';
        this.formError = true;
        this.formSuccess = false;

        // activate submit button
        this.buttonDisabled = false;
        return;
      }

      this.formError = false;

      const bodyRequest = {
        car_id: car_id,
        model_name: model_name,
        year: year,
        brand: brand,
      };

      try {
        if (this.userToken.hasToken && this.userToken.userId) {
          const res = await this.customCarsService
            .uploadCustomCar(this.userToken.userId, bodyRequest)
            .toPromise();
          // save id of custom car for upload imgs
          this.customCarId = res.customCar.id;

          this.successMsg = 'CUSTOM_CAR_UPLOADED';
          this.formSuccess = true;

          // activate submit button
          this.buttonDisabled = true;

          // end form
          this.customCarUploaded = true;
        }
      } catch (err: any) {
        console.error(err);
        this.buttonDisabled = false;

        if (err.error.errors[0].param === 'brand') {
          this.errorMsg = 'POST_CUSTOM_CAR_BAD_BRAND';
          this.formError = true;
          return;
        }

        this.errorMsg = 'UNEXPECTED_ERROR';
        this.formError = true;
      }
    } else {
      this.errorMsg = 'GN_TOKEN_EXPIRED';
      this.formError = true;
    }
  }

  async uploadImg(file: File | null) {
    try {
      if (
        this.userToken.hasToken &&
        this.userToken.userId &&
        file &&
        this.customCarId !== 0
      ) {
        this.imageUploaded = true;
        await this.customCarsService
          .uploadImg(this.userToken.userId, this.customCarId, file)
          .toPromise();
        this.formSuccess = true;
        this.successMsg = 'CUSTOM_CAR_IMG_UPLOADED';
      }
    } catch (err) {
      console.error(err);
    }
  }

  goBack() {
    this.router.navigate(['/custom-cars']);
  }
}
