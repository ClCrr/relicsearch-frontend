export interface Reliquia {
  id?: number; // Es opcional porque al crear (POST) aún no tenemos ID
  nombre: string;
  descripcion: string;
  historia?: string;
  imageUrl?: string;
}