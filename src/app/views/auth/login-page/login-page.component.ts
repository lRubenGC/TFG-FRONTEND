import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from 'src/app/services/language.service';
import { AuthService } from '../auth.service';
import { isValidPassword, isValidEmail, isValidUsername } from 'src/app/helpers/auth';
import { Router } from '@angular/router';

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
  registerErrorMsg = '';

  loginSuccess = false;
  loginSuccessMsg = '';

  registerSuccess = false;
  registerSuccessMsg = '';

  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
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
    // this.loginForm.valueChanges.subscribe(() => {
    //   this.loginFormInvalid();
    // })
  }

  submitLogin() {
    const email = this.loginForm.value.login_email;
    const password = this.loginForm.value.login_password;

    if (this.loginFormValid(email, password)) {
      this.authService
        .login({
          email,
          password
        })
        .subscribe(
          (res) => {
            this.loginSuccess = true;
            this.loginSuccessMsg = 'LOGIN_SUCCESFUL'

            localStorage.setItem('cw-token', res.token);

            this.router.navigate(['/']);
          },
          (err) => {
            if (err.error.err === 1) {
              this.loginErrorMsg = 'LOGIN_BAD_REQUEST';
            } else this.loginErrorMsg = 'UNEXPECTED_ERROR'
            this.loginError = true;
          }
        );
    }
  }

  submitRegister() {
    const username = this.registerForm.value.register_username;
    const email = this.registerForm.value.register_email;
    const password = this.registerForm.value.register_password;

    if (this.registerFormValid(username, email, password)) {
      this.authService
        .register({
          username,
          email,
          password,
        })
        .subscribe(
          (res) => {
            this.registerSuccess = true;
            this.registerSuccessMsg = 'REGISTER_SUCCESFUL'
          },
          (err) => {
            if (err.error.errors[0].param === 'username') {
              this.registerErrorMsg = 'USERNAME_IN_USE';
              this.registerError = true;
              return;
            }

            if (err.error.errors[0].param === 'email') {
              this.registerErrorMsg = 'EMAIL_IN_USE';
              this.registerError = true;
              return;
            }
          }
        );
    }
  }

  toggleLogin() {
    this.loginActivo = !this.loginActivo;
  }

  loginFormValid(email: string, password: string) {    
    if (!isValidEmail(email)) {
      this.loginError = true;
      this.loginErrorMsg = 'LOGIN_BAD_EMAIL'
      return false;
    }

    if (!isValidPassword(password)) {
      this.loginError = true;
      this.loginErrorMsg = 'LOGIN_BAD_PASSWORD'
      return false;
    }

    this.loginError = false;
    return true;
  }

  registerFormValid(username: string, email: string, password: string) {    
    if (!isValidUsername(username)) {
      this.registerError = true;
      this.registerErrorMsg = 'LOGIN_BAD_USERNAME'
      return false;
    }

    if (!isValidEmail(email)) {
      this.registerError = true;
      this.registerErrorMsg = 'LOGIN_BAD_EMAIL'
      return false;
    }

    if (!isValidPassword(password)) {
      this.registerError = true;
      this.registerErrorMsg = 'LOGIN_BAD_PASSWORD'
      return false;
    }

    this.registerError = false;
    return true;
  }

}
