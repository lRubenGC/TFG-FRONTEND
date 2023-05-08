// Angular libs
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Base App
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Module Views
import { BasicCarsPageModule } from './views/basic-cars-page/basic-cars-page.module';
import { CustomCarsModule } from './views/custom-cars/custom-cars.module';
import { LandingPageModule } from './views/landing-page/landing-page.module';
import { PremiumCarsPageModule } from './views/premium-cars-page/premium-cars-page.module';
import { SharedModule } from './views/shared/shared.module';
import { UserModule } from './views/user/user.module';
import { AuthModule } from './views/auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Views
    AuthModule,
    BasicCarsPageModule,
    CustomCarsModule,
    LandingPageModule,
    PremiumCarsPageModule,
    SharedModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
