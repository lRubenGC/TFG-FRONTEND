// Angular libs
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Base App
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// GA4
import { GtagModule } from 'angular-gtag';

// Module Views
import { ComponentsModule } from './components/components.module';
import { AuthGuard } from './guards/auth.guard';
import { AuthModule } from './views/auth/auth.module';
import { BasicCarsPageModule } from './views/basic-cars-page/basic-cars-page.module';
import { CustomCarsModule } from './views/custom-cars/custom-cars.module';
import { DetailedCarPageModule } from './views/detailed-car-page/detailed-car-page.module';
import { InfoModule } from './views/info/info.module';
import { LandingPageModule } from './views/landing-page/landing-page.module';
import { PremiumCarsPageModule } from './views/premium-cars-page/premium-cars-page.module';
import { SearchResultsPageModule } from './views/search-results/search-results-page.module';
import { UserModule } from './views/user/user.module';

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

    // GA4
    GtagModule.forRoot({ trackingId: 'G-P9GYT9HZTD', trackPageviews: true }),

    // App Modules
    AuthModule,
    ComponentsModule,
    BasicCarsPageModule,
    CustomCarsModule,
    DetailedCarPageModule,
    InfoModule,
    LandingPageModule,
    PremiumCarsPageModule,
    SearchResultsPageModule,
    UserModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
