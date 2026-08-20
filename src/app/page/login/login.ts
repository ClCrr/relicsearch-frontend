import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule, 
    MatInputModule, 
    MatButtonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMensaje: string = ''; // Para mostrar errores de backend si la credencial falla

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private authService: AuthService // <-- 1. Inyectamos AuthService aquí
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ingresarSistema() {
    if (this.loginForm.valid) {
      this.errorMensaje = '';
      const credenciales = this.loginForm.value;

      // <-- 2. Llamamos al servicio de autenticación
      this.authService.login(credenciales).subscribe({
        next: (respuesta) => {
          console.log('Login exitoso:', respuesta);
          // Redirigimos al Dashboard una vez autenticado
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.errorMensaje = 'Usuario o contraseña incorrectos';
        }
      });

    } else {
      console.log('El formulario no es válido');
      this.loginForm.markAllAsTouched(); // Muestra en rojo los campos obligatorios si están vacíos
    }
  }
}