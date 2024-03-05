export interface User {
  id: number;
  name: string;
  email: string;
  numero_celular?: string; 
  cedula: string;
  fecha_nacimiento: string;
  codigo_ciudad: number;
  password: string;
  password_confirmation: string;
  created_at?: string;
  updated_at?: string;
  email_verified_at?: string | null;
  role: 'usuario' | 'admin' | 'superadmin';
}