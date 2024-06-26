import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { CheckToken } from 'src/app/shared/guards/checkToken.guard';
import { LoginComponent } from './views/login/login.component';
import { RecoverAccountComponent } from './views/recover-account/recover-account.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [CheckToken],
  },
  {
    path: 'recover-account',
    component: RecoverAccountComponent,
    canActivate: [AuthGuard, CheckToken],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
