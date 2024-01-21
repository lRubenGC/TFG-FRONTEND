import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import {
  Subject,
  catchError,
  filter,
  lastValueFrom,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import {
  isValidEmail,
  isValidPassword,
  isValidUsername,
} from 'src/app/modules/auth/models/auth.functions';
import { ITOAST_OBJECT } from 'src/app/shared/models/toast-shared.models';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditView {
  //#region MESSAGES
  public submitButtonDisabled: boolean = false;
  public errorMessage: string = '';
  public successMessage: string = '';
  //#endregion MESSAGES

  //#region USER DATA
  public userData$ = this.userService.getUserById().pipe(
    tap((userData) => {
      if (userData) {
        this.userForm.controls['username'].setValue(userData.username);
        this.userForm.controls['email'].setValue(userData.email);
      }
    })
  );
  //#endregion USER DATA

  //#region USER FORM
  public userForm: FormGroup;
  public submitUserForm = new Subject<FormGroup>();
  public submitUserForm$ = this.submitUserForm.pipe(
    filter(({ value }) => {
      if (!isValidUsername(value.username)) {
        this.errorMessage = 'user.edit.invalid_username';
        return false;
      }
      if (!isValidEmail(value.email)) {
        this.errorMessage = 'user.edit.invalid_email';
        return false;
      }
      if (value.password && !isValidPassword(value.password)) {
        this.errorMessage = 'user.edit.invalid_password';
        return false;
      }
      this.errorMessage = '';
      return true;
    }),
    switchMap(({ value }) =>
      this.userService.updateUser(value).pipe(
        catchError(({ error }) => {
          this.successMessage = '';
          if (error.code === 1) this.errorMessage = 'user.edit.taken_username';
          if (error.code === 2) this.errorMessage = 'user.edit.taken_email';
          return of();
        }),
        tap((res) => {
          this.authService.isUserLoggedIn$.next(true);
          this.submitButtonDisabled = true;
          this.errorMessage = '';
          this.successMessage = 'user.edit.success_update';
        })
      )
    )
  );
  //#endregion USER FORM

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private messageService: MessageService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      imgs: this.fb.array([]),
    });
  }

  get imgs(): FormArray {
    return this.userForm.get('imgs') as FormArray;
  }

  onImagesSelected(imgs: File[]) {
    imgs.forEach((image) => this.imgs.push(this.fb.control(image)));
  }

  onErrorEmit() {
    this.showToast({
      severity: 'error',
      summary: 'toast.error',
      detail: 'toast.more_than_one_img',
    });
  }

  private async showToast(
    toastObject: ITOAST_OBJECT,
    life?: number,
    img?: string,
    formats?: string[]
  ) {
    const summaryT = this.translate.get(toastObject.summary);
    const summary = await lastValueFrom(summaryT);

    const detailT = this.translate.get(toastObject.detail);
    let detail = await lastValueFrom(detailT);

    if (img && formats) {
      const invalid_formatT = this.translate.get('toast.invalid_format');
      const invalid_format = await lastValueFrom(invalid_formatT);
      const valid_formatsT = this.translate.get('toast.valid_formats');
      const valid_formats = await lastValueFrom(valid_formatsT);
      detail = `${invalid_format}: ${img} ... ${valid_formats}: ${formats}`;
    }

    this.messageService.add({
      key: 'br',
      severity: toastObject.severity,
      summary,
      detail,
      life: life ?? 3000,
    });
  }
}
