import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutCWPageComponent } from './about-cw/about-cw-page.component';
import { UpdatesPageComponent } from './updates/updates-page.component';



const routes: Routes = [
    {
      path: 'about',
      component: AboutCWPageComponent,
    },
    {
      path: 'updates',
      component: UpdatesPageComponent
    },
    {
      path: '**',
      redirectTo: 'about'
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfoRoutingModule { }
