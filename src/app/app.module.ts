// Angular libs
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { SearchResultsPageModule } from './views/search-results/search-results-page.module';
import { AuthGuard } from './guards/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
  ],
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
        deps: [HttpClient]
      }
    }),

    // App Modules
    AuthModule,
    BasicCarsPageModule,
    CustomCarsModule,
    LandingPageModule,
    PremiumCarsPageModule,
    SearchResultsPageModule,
    SharedModule,
    UserModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
