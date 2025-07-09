import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../services/registerRequest';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  // Datos personales
  email: string = '';
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  celular: string = '';

  // Contraseña
  password: string = '';
  confirmarPassword: string = '';
  mostrarPassword: boolean = false;
  mostrarConfirmPassword: boolean = false;

  // Documento
  tipoDocumento: string = '';
  numeroDocumento: string = '';

  // Dirección
  direccion: string = '';
  departamento: string = '';
  distrito: string = '';
  codigoZip: string = '';
  referencia: string = '';

  // Validaciones
  celularTocado: boolean = false;
  terminosAceptados: boolean = false;
  terminosTocado: boolean = false;

  // Modo invitado
  modoInvitado: boolean = false;

  // Alertas visuales
  alertaCampos: boolean = false;
  alertaTerminos: boolean = false;
  alertaPassword: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const invitadoFlag = localStorage.getItem('modoInvitado');
    this.modoInvitado = invitadoFlag === 'true';
    if (!this.modoInvitado) {
      localStorage.removeItem('modoInvitado');
    }
  }

  /**
   * Método principal de validación antes de registrar
   */
  validarTerminos(): void {
    this.terminosTocado = true;

    // Reinicia alertas previas
    this.alertaCampos = false;
    this.alertaTerminos = false;
    this.alertaPassword = false;

    if (!this.terminosAceptados) {
      this.alertaTerminos = true;
      return;
    }

    this.registrar();
  }

  /**
   * Lógica completa de registro del usuario
   */
  registrar(): void {
    // Verifica campos requeridos
    if (!this.email || !this.nombre || !this.apellido || !this.tipoDocumento || !this.numeroDocumento ||
        !this.direccion || !this.departamento || !this.distrito) {
      this.alertaCampos = true;
      return;
    }

    // Valida contraseña
    if (!this.modoInvitado && this.password !== this.confirmarPassword) {
      this.alertaPassword = true;
      return;
    }

    const request: RegisterRequest = {
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      password: this.modoInvitado ? '' : this.password,
      tipoDocumento: this.tipoDocumento,
      numeroDocumento: this.numeroDocumento,
      direccion: this.direccion,
      departamento: this.departamento,
      distrito: this.distrito,
      codigoZip: this.codigoZip,
      referencia: this.referencia
    };

    const usuarioActivo = {
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      direccion: this.direccion,
      departamento: this.departamento,
      distrito: this.distrito,
      codigoZip: this.codigoZip,
      referencia: this.referencia,
      celular: this.celular
    };
    localStorage.setItem('usuarioActivo', JSON.stringify(usuarioActivo));
    localStorage.removeItem('modoInvitado');

    if (!this.modoInvitado) {
      this.auth.registrar(request);
    }

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const destino = carrito.length > 0 ? '/carrito' : '/productos';
    this.router.navigate([destino]);
  }

  /**
   * Vuelve a la vista de login
   */
  volver(): void {
    localStorage.removeItem('modoInvitado');
    this.router.navigate(['/login']);
  }

  /**
   * Modo invitado: limpia contraseñas y activa flag
   */
  continuarComoInvitado(): void {
    localStorage.setItem('modoInvitado', 'true');
    this.modoInvitado = true;
    this.password = '';
    this.confirmarPassword = '';
  }
}
