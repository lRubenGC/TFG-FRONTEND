import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { decodeToken, tokenObject } from 'src/app/helpers/generics';
import { userInterfaceApi, userUpdateRequest } from 'src/app/models/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isValidEmail, isValidPassword, isValidUsername } from 'src/app/helpers/auth';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  @Output() deleteImageEvent: EventEmitter<any> = new EventEmitter();

  @ViewChild('submitButton', { static: true }) submitButtonRef!: ElementRef;

  configForm!: FormGroup;

  userToken!: tokenObject;
  data!: userInterfaceApi;

  images: File[] | null[] = [null, null];

  formError = false;
  errorMsg = '';
  formSuccess = false;
  successMsg = '';

  buttonDisabled: boolean = false;

  imgDeleted = false;
  bgDeleted = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private loaderService: LoaderService,
  ) {
    this.configForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      img: [null],
      img_bg: [null]
    });
  }

  async ngOnInit() {
    this.userToken = await decodeToken();
    
    if (this.userToken.hasToken && this.userToken.userId) {
      this.data = await this.userService.getUserData(this.userToken.userId);
      this.configForm.patchValue({
        username: this.data.user.username,
        email: this.data.user.email
      })
    }
  }

  ngAfterContentInit() {
    this.loaderService.stopLoading();
  }

  async submitForm() {
    // restart notifications
    this.formError = false;
    this.formSuccess = false;

    // disable submit button
    this.buttonDisabled = true;


    // data of user
    const user = this.data.user;
    
    // data of form
    const username = this.configForm.get('username')?.value;
    const email = this.configForm.get('email')?.value;
    const password = this.configForm.get('password')?.value;

    const bodyRequest: userUpdateRequest = {}

    // validations
    if (username !== user.username) {
      if (!isValidUsername(username)) {
        this.errorMsg = 'LOGIN_BAD_USERNAME';
        this.formError = true;
        this.formSuccess = false;
      
        // activate submit button
        this.buttonDisabled = false;
        return;
      }

      bodyRequest.username = username;
    }

    if (email !== user.email) {
      if (!isValidEmail(email)) {
        this.errorMsg = 'LOGIN_BAD_EMAIL';
        this.formError = true;
        this.formSuccess = false;
      
        // activate submit button
        this.buttonDisabled = false;
        return;
      }

      bodyRequest.email = email;
    }

    if (password.length > 0) {
      if (!isValidPassword(password)) {
        this.errorMsg = 'LOGIN_BAD_PASSWORD';
        this.formError = true;
        this.formSuccess = false;
      
        // activate submit button
        this.buttonDisabled = false;
        return;
      }

      bodyRequest.password = password;
    }


    if (Object.keys(bodyRequest).length === 0 && this.images[0] === null && this.images[1] === null) {
      this.errorMsg = 'CONFIG_EMPTY_VALUES';
      this.formError = true;
      this.formSuccess = false;

      // activate submit button
      this.buttonDisabled = false;
      return;
    }

    this.formError = false;

    try {
      this.loaderService.startLoading();
      // update imgs
      if (this.images[0] !== null || this.images[1] !== null) {
        await this.updateImgs();
      }
      
      // update data (username | email | password)
      if (Object.keys(bodyRequest).length > 0) {
        await this.userService.updateUser(user.id, bodyRequest).toPromise();
        this.successMsg = 'CONFIG_USER_UPDATED';
        this.formSuccess = true;
      }

      // activate submit button
      this.buttonDisabled = false;
      location.reload();
      
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
    }

    // update imgs
    if (this.images[0] !== null || this.images[1] !== null) {
      this.updateImgs();
    }

  }

  onImageChanged(index: number, file: File | null) {
    this.formError = false;
    this.images[index] = file;
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
      // if object contains profile img, uploads it
      if (formData.has('image0')) {
        const image0 = formData.get('image0') as File;
        await this.userService.updateImg(this.data.user.id, image0).toPromise();
        this.deleteImageEvent.emit();
      }
  
      // if object contains banner img, uploads it
      if (formData.has('image1')) {
        const image1 = formData.get('image1') as File;
        await this.userService.updateImg(this.data.user.id, image1, true).toPromise();
        this.deleteImageEvent.emit();
      }

      this.successMsg = 'CONFIG_USER_UPDATED';
      this.formSuccess = true;

    } catch (err) {
      console.error(err);
    }
  }

  async deleteImg(event: any, type: number) {
    this.formError = false;
    if (event.pointerType === '') {
      return;
    }
    if (type === 1 && this.data.user.img === null) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return;
    } else if (type === 2 && this.data.user.bg_img === null) {
      this.errorMsg = 'CANNOT_DELETE_NO_IMG';
      this.formError = true;
      return;
    }

    if (type === 1 && this.data.user.img !== null) {
      try {
      this.loaderService.startLoading();
      
      await this.userService.deleteImg(this.data.user.id).toPromise();
      this.successMsg = 'CONFIG_IMG_DELETED';
      this.formSuccess = true;
      this.imgDeleted = true;

      } catch (err) {
        console.error(err);
      } finally {
        this.loaderService.stopLoading();
      }
    } else if (type === 2 && this.data.user.bg_img !== null) {
      try {
        this.loaderService.startLoading();
        
        await this.userService.deleteImg(this.data.user.id, true).toPromise();
        this.successMsg = 'CONFIG_IMG_DELETED';
        this.formSuccess = true;
        this.bgDeleted = true;

        } catch (err) {
          console.error(err);
        } finally {
          this.loaderService.stopLoading();
        }
    }
  }
  

}
