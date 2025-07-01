import { NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../core/services/carrito';

@Component({
  selector: 'app-pago',
  standalone: true,               // <-- Asegura standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.html',
  styleUrl: './pago.css'
})
export class Pago implements OnInit {
  // Variable pública para acceder desde pago.html
  // Inyectar el servicio carritoService
  public carritoService = inject(CarritoService);
  private router = inject(Router);

  // Datos del formulario de pago
  pago = {
    nombre: '',
    apellido: '',
    tarjeta: '',
    expiracion: '',
    cvv: '',
    guardar: false,

    // Campos nuevos para la selección de método
    metodo: 'contra',  // valor por defecto
    wallet: ''         // 'yape' o 'plin'
  };

  // Tipo de envío seleccionado y costo adicional
  tipoEnvio: string = '';
  costoEnvio: number = 0;

  // Al iniciar, obtenemos el tipo de envío desde localStorage
  ngOnInit(): void {
    this.tipoEnvio = localStorage.getItem('tipoEnvio') || 'domicilio';
    this.costoEnvio = this.tipoEnvio === 'domicilio' ? 2.50 : 0;
  }

  // Accedemos al arreglo del carrito usando el servicio
  get carrito() {
    return this.carritoService.getCarrito(); // Devuelve el arreglo de productos desde el servicio
  }

  // Calculamos el subtotal sin envío
  get subtotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  // Calculamos el total incluyendo costo de envío
  get total(): number {
    return this.subtotal + this.costoEnvio;
  }

  // Proceso de pago
  pagar() {
    // Validación si se usa billetera
    if (this.pago.metodo === 'wallet' && !this.pago.wallet) {
      alert('Por favor, selecciona Yape o Plin.');
      return;
    }

    // Guardar resumen en localStorage para que esté disponible en pago-resumen
    localStorage.setItem('pagoResumen', JSON.stringify({
      ...this.pago,
      metodoEnvio: this.tipoEnvio,
      costoEnvio: this.costoEnvio,
      total: this.total,
      subtotal: this.subtotal,
      direccion: localStorage.getItem('direccion') || '',
      tiempoEstimado: this.tipoEnvio === 'domicilio' ? '2 días' : '1 día',
      carrito: this.carrito,
      codigoPedido: Math.floor(100000 + Math.random() * 900000) // Código de 6 dígitos
    }));

    alert('¡Pago procesado correctamente!');

    // Limpiar tipo de envío si deseas
    localStorage.removeItem('tipoEnvio');

    // Navegar al resumen
    this.router.navigate(['/pago-resumen']);
  }

  // Formatea MM/AA
  formatearFechaExpiracion(event: any) {
    let input = event.target.value.replace(/\D/g, ''); // Eliminar todo lo que no sea dígito

    if (input.length >= 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }

    this.pago.expiracion = input;
  }

  // Botón volver a la pantalla anterior
  volver(): void {
    this.router.navigate(['/envio']);
  }
}
