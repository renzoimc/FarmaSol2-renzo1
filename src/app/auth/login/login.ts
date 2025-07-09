import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../services/loginRequest';
import { RegisterRequest } from '../services/registerRequest';

declare const grecaptcha: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  esRegistro: boolean = false; // Alternancia entre login y registro

  // Campos comunes (login y registro)
  email: string = '';
  password: string = '';
  captchaInvalido: boolean = false;

  // Solo para registro
  nombre: string = '';
  apellido: string = '';
  telefono: string = '';
  passwordRegistro: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  // Alterna entre login y registro (formulario compartido)
  alternarModo() {
    this.esRegistro = !this.esRegistro;

    // Limpia los campos
    this.email = '';
    this.password = '';
    this.nombre = '';
    this.apellido = '';
    this.telefono = '';
    this.passwordRegistro = '';
  }

  

  // Iniciar sesión


iniciarSesion() {
  // Validación manual del captcha
  const token = grecaptcha.getResponse();
  if (!token) {
    this.captchaInvalido = true;
    return;
  }

  if (!this.email || !this.password) {
    alert('Por favor completa todos los campos.');
    return;
  }

  const request: LoginRequest = {
    email: this.email,
    password: this.password
  };

  if (this.auth.login(request)) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
    const datos = usuarios[this.email];

    if (datos) {
      localStorage.setItem('usuarioActivo', JSON.stringify(datos));
    }

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const rutaDestino = carrito.length > 0 ? '/carrito' : '/productos';
    this.router.navigate([rutaDestino]);
  } else {
    alert('Credenciales incorrectas');
  }
}

  // Registrar nuevo usuario o invitado
  registrar() {
    const esInvitado = localStorage.getItem('modoInvitado') === 'true';

    // Validación: permitir registro sin password si es invitado
    if (!this.email || !this.nombre || !this.apellido || !this.telefono || (!esInvitado && !this.passwordRegistro)) {
      alert('Por favor completa todos los campos del registro.');
      return;
    }

    const request: RegisterRequest = {
      email: this.email,
      nombre: this.nombre,
      apellido: this.apellido,
      telefono: this.telefono,
      password: esInvitado ? undefined : this.passwordRegistro
    };

    const nuevo = this.auth.registrar(request);
    localStorage.setItem('usuarioActivo', JSON.stringify(nuevo));

    // Limpia modo invitado si estaba activo
    localStorage.removeItem('modoInvitado');

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const rutaDestino = carrito.length > 0 ? '/carrito' : '/productos';

    this.router.navigate([rutaDestino]);
  }

  // Activar modo invitado y redirigir a registro sin contraseña
  continuarComoInvitado() {
    localStorage.setItem('modoInvitado', 'true');
    this.router.navigate(['/registro']);
  }

  // Alternativa para redirigir al formulario completo de registro
  irARegistro() {
    localStorage.removeItem('modoInvitado'); // Asegura que no esté en modo invitado
    this.router.navigate(['/registro']);
  }

  ngAfterViewInit() {
  // Renderiza manualmente si no apareció automáticamente
    setTimeout(() => {
      if (typeof grecaptcha !== 'undefined') {
        const captchaElements = document.querySelectorAll('.g-recaptcha');
        if (captchaElements.length && grecaptcha.render) {
          grecaptcha.render(captchaElements[0], {
            sitekey: '6LcI13wrAAAAAHTn5a5OSHes1EJSlZuAxXB8GNFu'
          });
        }
      }
    }, 500);
  }


}
