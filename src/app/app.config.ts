import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { provideHttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';

export const appConfig: ApplicationConfig = {
  providers: [
    PortalModule,
    DatePipe,
    AuthService,
    AuthGuard,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
  ],
};
