import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

// RUTAS CORREGIDAS
import { authInterceptor } from './core/services/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  
    
    // 2. Agrega withFetch() dentro de provideHttpClient
    provideHttpClient(
      withFetch(), // <-- AGREGA ESTA LÍNEA
      withInterceptors([authInterceptor]) // si tienes interceptores tipo función
    )
  ]
};