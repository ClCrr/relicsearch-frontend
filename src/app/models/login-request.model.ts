export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  token: string;
  // Puedes agregar otros campos si tu backend los devuelve (ej. nombre de usuario)
}