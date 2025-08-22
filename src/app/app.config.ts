import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {provideTranslateService, TranslateLoader} from "@ngx-translate/core";
import { CustomTranslateLoader } from './core/i18n/translate-loader';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    provideTranslateService({
      defaultLanguage: 'en_US',
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient]
      }
    }),
    provideHttpClient(withFetch()),
  ]
};
