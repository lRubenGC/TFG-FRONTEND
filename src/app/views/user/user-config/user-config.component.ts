import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { decodeToken } from 'src/app/helpers/generics';
import { userInterfaceApi } from 'src/app/models/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {

  configForm!: FormGroup;

  userToken = decodeToken();
  data!: userInterfaceApi;

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
    console.log('a')
  }

  onFileSelected(img: string) {
    console.log(img)
  }

}
