import { Component } from '@angular/core';
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
  //#region USERLOGO
  public userLogoImage$: Observable<string> = from(decodeToken()).pipe(
    switchMap((userIdToken: userIdToken) => {
      if (userIdToken && userIdToken.userId) {
        return from(
          this.userService
            .getUserById(userIdToken.userId)
            .pipe(switchMap((user: UserData) => of(user.img)))
        );
      } else return of('');
    })
  );
  //#endregion USERLOGO
  constructor(private userService: UserService) {}
}
