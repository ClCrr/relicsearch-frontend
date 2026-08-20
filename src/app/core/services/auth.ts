import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, RegisterRequest, AuthResponse } from '../../models/auth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID); // <-- Inyección del ID de plataforma
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  
  // Mantiene el estado de si el usuario está logueado para actualizar la UI
  private readonly isLoggedIn = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedIn.asObservable();

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, data).pipe(
      tap(response => this.saveToken(response.token))
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) { // <-- Verificación de navegador
      localStorage.removeItem('jwt_token');
    }
    this.isLoggedIn.next(false);
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) { // <-- Verificación de navegador
      return localStorage.getItem('jwt_token');
    }
    return null; // En el servidor (SSR) retorna null
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    if (isPlatformBrowser(this.platformId)) { // <-- Verificación de navegador
      return !!localStorage.getItem('jwt_token');
    }
    return false; // En el servidor (SSR) se asume falso
  }

  private saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) { // <-- Verificación de navegador
      localStorage.setItem('jwt_token', token);
    }
    this.isLoggedIn.next(true);
  }
}