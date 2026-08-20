import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Conservamos solo los módulos de Material que seguimos usando (Íconos y Modal)
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; 
import { Router } from '@angular/router';

// Ajusta estas rutas según corresponda en tu proyecto
import { ReliquiaService } from '../../core/services/reliquia';
import { AuthService } from '../../core/services/auth';
import { Reliquia } from '../../models/reliquia';
import { ReliquiaFormComponent } from '../../features/reliquia-form/reliquia-form';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule // Solo mantenemos el Dialog y los Icons
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  private readonly reliquiaService = inject(ReliquiaService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog); 

  reliquias: Reliquia[] = [];

  ngOnInit(): void {
    this.cargarReliquias();
  }

  cargarReliquias(): void {
    this.reliquiaService.getReliquias().subscribe({
      next: (datos) => {
        this.reliquias = datos;
      },
      error: (err) => {
        console.error('Error al cargar reliquias', err);
        alert('Hubo un error al obtener los datos del servidor.');
      }
    });
  }

  // --- Método para abrir el modal de Crear o Editar ---
  abrirFormulario(reliquia?: Reliquia): void {
    const dialogRef = this.dialog.open(ReliquiaFormComponent, {
      width: '400px',
      data: reliquia || null 
    });

    // Escuchamos cuando el modal se cierra
    dialogRef.afterClosed().subscribe((resultado: Reliquia) => {
      if (resultado) {
        // Si tiene ID, significa que estamos actualizando una existente
        if (resultado.id) {
          this.reliquiaService.actualizarReliquia(resultado.id, resultado).subscribe({
            next: () => this.cargarReliquias(), 
            error: (err) => {
              console.error('Error al actualizar', err);
              alert('Error al actualizar la reliquia.');
            }
          });
        } 
        // Si no tiene ID, estamos creando una nueva
        else {
          // CLAVE: Creamos una copia de los datos y ELIMINAMOS el 'id' nulo
          const nuevaReliquia = { ...resultado };
          delete nuevaReliquia.id; // ¡Esto evita el Error 500 en Spring Boot!

          this.reliquiaService.crearReliquia(nuevaReliquia).subscribe({
            next: () => this.cargarReliquias(), 
            error: (err) => {
              console.error('Error al crear', err);
              alert('Error al crear la reliquia.');
            }
          });
        }
      }
    });
  }

  eliminar(id: number | undefined): void {
    if (!id) return;
    
    if (confirm('¿Estás seguro de que deseas eliminar esta reliquia?')) {
      this.reliquiaService.eliminarReliquia(id).subscribe({
        next: () => {
          this.cargarReliquias();
        },
        error: (err) => {
          console.error('Error al eliminar', err);
          alert('No se pudo eliminar la reliquia.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
