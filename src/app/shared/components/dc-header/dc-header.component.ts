import { Component, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { Observable, from, of, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { decodeToken } from '../../functions/token-functions';
import { userIdToken } from '../../models/token.models';
import { UserData } from '../../models/user.models';

@Component({
  selector: 'dc-header',
  templateUrl: './dc-header.component.html',
  styleUrls: ['./dc-header.component.scss'],
})
export class DcHeaderComponent {
  //#region USER DATA
  public userData$: Observable<UserData> = from(decodeToken()).pipe(
    switchMap((userIdToken: userIdToken) => {
      if (userIdToken && userIdToken.userId) {
        return from(this.userService.getUserById(userIdToken.userId));
      } else return of();
    })
  );
  //#endregion USER DATA
  constructor(private userService: UserService) {}

  //#region USER MENU OVERLAY
  @ViewChild('userMenu', { static: false }) userMenu!: OverlayPanel;
  public toggleUserMenu(event: any): void {
    this.userMenu.toggle(event);
    document.body.classList.toggle('no-scroll');
  }
  public onUserMenuClose(): void {
    document.body.classList.remove('no-scroll');
  }
  //#endregion USER MENU OVERLAY
}
