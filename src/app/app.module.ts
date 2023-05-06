import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// BASIC CARS PAGE
import { BasicCarsPageComponent } from './views/basic-cars-page/basic-cars-page.component';

// CUSTOM CARS PAGES
import { CustomCarsPageComponent } from './views/custom-cars/custom-cars-page/custom-cars-page.component';
import { UploadCustomCarPageComponent } from './views/custom-cars/upload-custom-car-page/upload-custom-car-page.component';

// LANDING PAGE
import { LandingPageComponent } from './views/landing-page/landing-page.component';
import { LandingCardComponent } from './views/landing-page/components/landing-card/landing-card.component';

// LOGIN PAGE
import { LoginPageComponent } from './views/login-page/login-page.component';

// PREMIUM PAGE
import { PremiumCarsPageComponent } from './views/premium-cars-page/premium-cars-page.component';

// SHARED COMPONENTS
import { HeaderComponentComponent } from './views/shared/header-component/header-component.component';
import { NotificationCarComponentComponent } from './views/shared/notification-car-component/notification-car-component.component';

// USER PAGES
import { UserProfileComponent } from './views/user/user-profile/user-profile.component';
import { UserConfigComponent } from './views/user/user-config/user-config.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    
    //----------------------------------- BASIC CARS PAGE
    BasicCarsPageComponent,
    
    //----------------------------------- CUSTOM CARS PAGE
    CustomCarsPageComponent,
    UploadCustomCarPageComponent,

    //----------------------------------- LANDING PAGE
    LandingPageComponent,
    LandingCardComponent,

    //----------------------------------- LOGIN PAGE
    LoginPageComponent,
    
    //----------------------------------- PREMIUM CARS PAGE
    PremiumCarsPageComponent,
        
    //----------------------------------- SHARED COMPONENTS
    HeaderComponentComponent,
    NotificationCarComponentComponent,

    //----------------------------------- USER PAGES
    UserProfileComponent,
    UserConfigComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
