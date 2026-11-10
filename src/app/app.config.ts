import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeTe from '@angular/common/locales/te';
import localeHi from '@angular/common/locales/hi';
import { routes } from './app.routes';

// Register Telugu & Hindi regional locales for angular l10n date/currency formatting
registerLocaleData(localeTe, 'te');
registerLocaleData(localeHi, 'hi');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' })
    ),
  ],
};
