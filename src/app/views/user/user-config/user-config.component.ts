import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { decodeToken } from 'src/app/helpers/generics';
import { userInterfaceApi, userUpdateRequest } from 'src/app/models/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isValidEmail, isValidPassword, isValidUsername } from 'src/app/helpers/auth';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  configForm!: FormGroup;

  userToken = decodeToken();
  data!: userInterfaceApi;

  images: File[] | null[] = [null, null];

  formError = false;
  errorMsg = '';
  formSuccess = false;
  successMsg = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
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
    if (this.userToken.hasToken && this.userToken.userId) {
      this.data = await this.userService.getUserData(this.userToken.userId);
      this.configForm.patchValue({
        username: this.data.user.username,
        email: this.data.user.email
      })
    }
  }

  submitForm() {
    // data of user
    const user = this.data.user;
    
    // data of form
    const username = this.configForm.get('username')?.value;
    const email = this.configForm.get('email')?.value;
    const password = this.configForm.get('password')?.value;

    const bodyRequest: userUpdateRequest = {}


    if (username !== user.username) {
      if (!isValidUsername(username)) {
        this.errorMsg = 'LOGIN_BAD_USERNAME';
        this.formError = true;
        return;
      }

      bodyRequest.username = username;
    }

    if (email !== user.email) {
      if (!isValidEmail(email)) {
        this.errorMsg = 'LOGIN_BAD_EMAIL';
        this.formError = true;
        return;
      }

      bodyRequest.email = email;
    }

    if (password.length > 0) {
      if (!isValidPassword(password)) {
        this.errorMsg = 'LOGIN_BAD_PASSWORD';
        this.formError = true;
        return;
      }

      bodyRequest.password = password;
    }

    if (Object.keys(bodyRequest).length === 0) {
      this.errorMsg = 'CONFIG_EMPTY_VALUES';
      this.formError = true;
      return;
    }

    this.formError = false;

    this.userService.updateUser(user.id, bodyRequest)
      .subscribe(
        (res) => {
          this.successMsg = 'CONFIG_USER_UPDATED';
          this.formSuccess = true;

          setTimeout(() => {
            location.reload();
          }, 1000);
          
        },
        (err) => {
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
        }
      );
  }

  onImageChanged(index: number, file: File | null) {
    this.images[index] = file;
  }

  async callApi() {
    const formData = new FormData();
    this.images.forEach((image, index) => {
      if (image) {
        formData.append(`image${index}`, image);
      }
    });
  }

}
