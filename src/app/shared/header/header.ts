import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../../core/services/carrito';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/services/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header implements OnInit, OnDestroy {
  public carritoService = inject(CarritoService);
  private router = inject(Router);
  private authService = inject(AuthService);

  usuarioActivo: string | null = null;
  nombreUsuario: string = '';
  inicial: string = '';

  private suscripcionUsuario: Subscription | undefined;

  ngOnInit(): void {
    this.suscripcionUsuario = this.authService.usuario$.subscribe((usuario: User | null) => {
      if (usuario) {
        this.usuarioActivo = usuario.email;
        this.nombreUsuario = usuario.nombre;
        this.inicial = usuario.nombre?.charAt(0).toUpperCase() || '';
      } else {
        this.usuarioActivo = null;
        this.nombreUsuario = '';
        this.inicial = '';
      }
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  irAMisPedidos() {
    this.router.navigate(['/historial']);
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario?.unsubscribe();
  }
}
