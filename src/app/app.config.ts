import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

// RUTAS CORREGIDAS
import { authInterceptor } from './core/services/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    // Configuramos HttpClient para que use nuestro interceptor funcional
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};