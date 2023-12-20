import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Observable, lastValueFrom, map } from 'rxjs';
import { AuthService } from '../../modules/auth/services/auth.service';
import { ITOAST_OBJECT } from '../models/toast-shared.models';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
    private translate: TranslateService
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.isUserLoggedIn$.pipe(
      map((isLoggedIn) => {
        if (!isLoggedIn) {
          this.showToast({
            severity: 'error',
            summary: 'toast.error',
            detail: 'toast.not_logged_in',
          });
          return false;
        }

        return true;
      })
    );
  }

  public async showToast(toastObject: ITOAST_OBJECT) {
    const summaryT = this.translate.get(toastObject.summary);
    const summary = await lastValueFrom(summaryT);

    const detailT = this.translate.get(toastObject.detail);
    const detail = await lastValueFrom(detailT);

    this.messageService.add({
      key: 'br',
      severity: toastObject.severity,
      summary: summary,
      detail: detail,
      life: 2000,
    });
  }
}
