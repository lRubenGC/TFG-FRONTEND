import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';


const routes: Routes = [
    {
      path: '',
      component: LoginPageComponent
    },
    {
      path: 'recover',
      component: RecoverPasswordComponent
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
