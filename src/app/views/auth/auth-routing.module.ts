import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { AuthGuard } from 'src/app/guards/auth.guard';


const routes: Routes = [
    {
      path: '',
      component: LoginPageComponent
    },
    {
      path: 'recover',
      component: RecoverPasswordComponent,
      canActivate: [AuthGuard]
    },
    {
      path: '**',
      redirectTo: ''
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
