// Angular libs
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Base App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Module Views
import { AuthModule } from './modules/auth/auth.module';
import { BasicCarsPageModule } from './modules/basic-cars/basic-cars.module';
import { LandingPageModule } from './modules/landing-page/landing-page.module';
import { PremiumCarsPageModule } from './modules/premium-cars/premium-cars.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    // Translate Module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http, './assets/i18n/', '.json');
        },
        deps: [HttpClient],
      },
    }),

    // App Modules
    AuthModule,
    BasicCarsPageModule,
    LandingPageModule,
    PremiumCarsPageModule,
    SharedModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
