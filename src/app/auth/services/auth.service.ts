import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginRequest } from './loginRequest';
import { RegisterRequest } from './registerRequest';
import { User } from './user';
import { guardarSesion, obtenerSesion, cerrarSesion } from './session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usuarios: User[] = [];

  // Observable del usuario activo
  private usuarioSubject = new BehaviorSubject<User | null>(obtenerSesion());
  usuario$ = this.usuarioSubject.asObservable(); // para suscribirse desde header.ts

  constructor() {}

  login(request: LoginRequest): boolean {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    const usuario = usuarios[request.email];

    if (usuario) {
      guardarSesion(usuario);
      this.usuarioSubject.next(usuario); // Notifica al header
      return true;
    }
    return false;
  }

  registrar(request: RegisterRequest): User {
    const nuevo: User = {
      id: crypto.randomUUID(),
      nombre: request.nombre,
      apellido: request.apellido,
      email: request.email,
      telefono: request.telefono,
      password: request.password,
      tipoDocumento: request.tipoDocumento,
      numeroDocumento: request.numeroDocumento,
      direccion: request.direccion,
      distrito: request.distrito,
      departamento: request.departamento,
      codigoZip: request.codigoZip,
      referencia: request.referencia
    };

    guardarSesion(nuevo);
    this.usuarioSubject.next(nuevo); // Notifica al header

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    usuarios[nuevo.email] = nuevo;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    return nuevo;
  }

  getUsuarioActivo(): User | null {
    return this.usuarioSubject.getValue();
  }

  logout() {
    cerrarSesion();
    this.usuarioSubject.next(null); // Notifica al header
  }
}
