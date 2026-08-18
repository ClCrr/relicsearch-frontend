import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

// RUTAS CORREGIDAS
import { AuthService } from '../auth'; // (Si tu archivo se llama auth.ts, quita el .service)
import { environment } from '../../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  // Solo interceptar peticiones que vayan a nuestra API
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  if (token && isApiUrl) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};