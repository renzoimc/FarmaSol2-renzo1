import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarritoService } from '../../core/services/carrito';
//import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-header',
  imports: [CommonModule , RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  // Se inyecta el servicio CarritoService 
  // Al ser variable publica, me permite acceder desde el header.html
  // Permite acceder a las funciones del carrito de compras (como cantidad)
  public carritoService = inject(CarritoService);
}
