export interface LoginRequest {
  email: string;
  password?: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  usuario: UsuarioInfo;
}

export interface UsuarioInfo {
  id: number;
  nombre: string;
  email: string;
}