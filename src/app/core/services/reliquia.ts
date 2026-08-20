import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reliquia } from '../../models/reliquia'; // Ajusta la ruta si es necesario
import { environment } from '../../../environments/environment'; // Ajusta la ruta a tu environment

@Injectable({
  providedIn: 'root'
})
export class ReliquiaService {
  private readonly http = inject(HttpClient);
  
  // Asegúrate de que este endpoint coincida con tu @RestController en Spring Boot
  private readonly apiUrl = `${environment.apiUrl}/relics`;

  // 1. Obtener todas las reliquias (GET)
  getReliquias(): Observable<Reliquia[]> {
    return this.http.get<Reliquia[]>(this.apiUrl);
  }

  // 2. Obtener una reliquia por ID (GET)
  getReliquiaById(id: number): Observable<Reliquia> {
    return this.http.get<Reliquia>(`${this.apiUrl}/${id}`);
  }

  // 3. Crear una nueva reliquia (POST)
  crearReliquia(reliquia: Reliquia): Observable<Reliquia> {
    return this.http.post<Reliquia>(this.apiUrl, reliquia);
  }

  // 4. Actualizar una reliquia existente (PUT)
  actualizarReliquia(id: number, reliquia: Reliquia): Observable<Reliquia> {
    return this.http.put<Reliquia>(`${this.apiUrl}/${id}`, reliquia);
  }

  // 5. Eliminar una reliquia (DELETE)
  eliminarReliquia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
