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
import { UserModule } from './views/user/user.module';
import { AuthModule } from './views/auth/auth.module';
import { SearchResultsPageModule } from './views/search-results/search-results-page.module';
import { AuthGuard } from './guards/auth.guard';
import { ComponentsModule } from './components/components.module';
import { InfoModule } from './views/info/info.module';


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
    ComponentsModule,
    BasicCarsPageModule,
    CustomCarsModule,
    InfoModule,
    LandingPageModule,
    PremiumCarsPageModule,
    SearchResultsPageModule,
    UserModule
  ],
  providers: [
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
