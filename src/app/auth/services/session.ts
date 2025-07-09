import { User } from './user';

const SESSION_KEY = 'usuarioActivo';

export function guardarSesion(usuario: User) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
}

export function obtenerSesion(): User | null {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
}

export function cerrarSesion() {
  localStorage.removeItem(SESSION_KEY);
}
