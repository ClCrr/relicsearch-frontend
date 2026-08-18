import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

// RUTA CORREGIDA (Si tu archivo se llama auth.ts, quita el .service)
import { AuthService } from '../auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirigir al login si no está autenticado
  router.navigate(['/login']);
  return false;
};