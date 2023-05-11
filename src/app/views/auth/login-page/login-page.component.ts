import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  registerForm!: FormGroup;
  loginForm!: FormGroup;
  loginActivo = true;

  loginError = false;
  loginErrorMsg = '';
  registerError = false;

  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      register_username: ['', Validators.required],
      register_email: ['', [Validators.required, Validators.email]],
      register_password: ['', Validators.required],
    });

    this.loginForm = this.formBuilder.group({
      login_email: ['', [Validators.required, Validators.email]],
      login_password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => {
      this.loginFormInvalid();
    })
  }

  submitLogin() {
    if (this.loginForm.valid) {
      this.authService
        .login({
          email: this.loginForm.value.login_email,
          password: this.loginForm.value.login_password,
        })
        .subscribe(
          (res) => console.log(res),
          (err) => {
            this.loginErrorMsg = err.error.msg;
            this.loginError = true;
          }
        );
    }
  }

  submitRegister() {
    if (this.registerForm.valid) {
      this.authService
        .register({
          username: this.registerForm.value.register_username,
          email: this.registerForm.value.register_email,
          password: this.registerForm.value.register_password,
        })
        .subscribe(
          (res) => console.log(res),
          (err) => console.log(err.error)
        );
    }
  }

  toggleLogin() {
    this.loginActivo = !this.loginActivo;
  }

  loginFormInvalid() {
    if (!this.loginForm.valid) {
      return true;
    }
    return false;
  }

}
