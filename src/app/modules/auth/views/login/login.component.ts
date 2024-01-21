import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from '../../models/auth.functions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isSmallScreen = false;
  private breakpointSubscription?: Subscription;

  registerForm!: UntypedFormGroup;
  loginForm!: UntypedFormGroup;
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
    private breakpointObserver: BreakpointObserver,
    private formBuilder: UntypedFormBuilder,
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
    this.breakpointSubscription = this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((result) => {
        this.isSmallScreen = result.matches;
      });
  }

  ngOnDestroy(): void {
    this.breakpointSubscription?.unsubscribe();
  }

  submitLogin() {
    const email = this.loginForm.value.login_email;
    const password = this.loginForm.value.login_password;

    if (this.loginFormValid(email, password)) {
      this.authService
        .login({
          email,
          password,
        })
        .subscribe(
          (res) => {
            // Login Notification
            this.loginSuccess = true;
            this.loginSuccessMsg = 'auth.notification.login_success';

            // Save token in Indexed DB
            localStorage.setItem('dt-token', res.token);
            localStorage.setItem('userId', res.user.id);

            // Dispatch login event
            this.authService.isUserLoggedIn$.next(true);

            // Redirect
            this.router.navigate(['/']);
          },
          (err) => {
            if (err.error.err === 1) {
              this.loginErrorMsg = 'auth.notification.login_fail';
            } else this.loginErrorMsg = 'auth.notification.unexpected_error';
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
            this.loginSuccess = true;
            this.loginSuccessMsg = 'auth.notification.signup_success';

            // Login automatically
            this.authService
              .login({
                email,
                password,
              })
              .subscribe(
                (res) => {
                  // Save token in Indexed DB
                  localStorage.setItem('dt-token', res.token);
                  localStorage.setItem('userId', res.user.id);

                  // Dispatch login event
                  this.authService.isUserLoggedIn$.next(true);

                  // Redirect
                  this.router.navigate(['/']);
                },
                (err) => {
                  if (err.error.err === 1) {
                    this.loginErrorMsg = 'auth.notification.login_fail';
                  } else
                    this.loginErrorMsg = 'auth.notification.unexpected_error';
                  this.loginError = true;
                }
              );
          },
          (err) => {
            if (err.error.errors[0].param === 'username') {
              this.registerErrorMsg = 'auth.notification.username_used';
              this.registerError = true;
              return;
            }

            if (err.error.errors[0].param === 'email') {
              this.registerErrorMsg = 'auth.notification.email_used';
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
      this.loginErrorMsg = 'auth.notification.bad_email';
      return false;
    }

    if (!isValidPassword(password)) {
      this.loginError = true;
      this.loginErrorMsg = 'auth.notification.bad_password';
      return false;
    }

    this.loginError = false;
    return true;
  }

  registerFormValid(username: string, email: string, password: string) {
    if (!isValidUsername(username)) {
      this.registerError = true;
      this.registerErrorMsg = 'auth.notification.bad_username';
      return false;
    }

    if (!isValidEmail(email)) {
      this.registerError = true;
      this.registerErrorMsg = 'auth.notification.bad_email';
      return false;
    }

    if (!isValidPassword(password)) {
      this.registerError = true;
      this.registerErrorMsg = 'auth.notification.bad_password';
      return false;
    }

    this.registerError = false;
    return true;
  }
}
