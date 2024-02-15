import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';

import { LOCALE_ID, NgModule } from '@angular/core';
import localeEs from '@angular/common/locales/es-AR';
import { registerLocaleData } from '@angular/common';

import { authInterceptorProviders } from './shared/helpers/auth-interceptor';
import { HttpHelper } from './shared/helpers/http-helper';
import { ConfigService } from './shared/services/config.service';

import { UserService } from './shared/services/user.service';
import { WeatherService } from './shared/services/weather.service';
import { RefreshTokenService } from './shared/services/refreshToken.service';

registerLocaleData(localeEs, 'es-AR');
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
    ],
    declarations: [AppComponent],
    providers: [


      {​​​​​​​​ provide: LOCALE_ID, useValue: 'es-AR' }​​​​​​​​ , 
      AuthGuard, authInterceptorProviders,
      HttpHelper,
      ConfigService,
      WeatherService,
      UserService,
      RefreshTokenService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
