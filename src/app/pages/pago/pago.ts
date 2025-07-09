import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../../core/services/carrito';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.html',
  styleUrl: './pago.css'
})
export class Pago implements OnInit {
  public carritoService = inject(CarritoService);
  private router = inject(Router);

  pago = {
    nombre: '',
    apellido: '',
    tarjeta: '',
    expiracion: '',
    cvv: '',
    guardar: false,
    metodo: 'contra',
    wallet: ''
  };

  tipoEnvio: string = '';
  costoEnvio: number = 0;
  pagoExitoso: boolean = false; // ← NUEVO

  ngOnInit(): void {
    const datosEnvioStr = localStorage.getItem('datosEnvio');
    
    if (datosEnvioStr) {
      const datosEnvio = JSON.parse(datosEnvioStr);
      this.tipoEnvio = datosEnvio.metodoEnvio || 'domicilio';

      // Calcular costo según distrito
      if (this.tipoEnvio === 'domicilio') {
        const distrito = datosEnvio.distrito?.toLowerCase() || '';
        this.costoEnvio = distrito === 'carmen de la legua' ? 2.50 : 5.00;
      } else {
        this.costoEnvio = 0;
      }
    } else {
      this.tipoEnvio = 'domicilio';
      this.costoEnvio = 5.00;
    }
  }

  get carrito() {
    return this.carritoService.getCarrito();
  }

  get subtotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);
  }

  get total(): number {
    return this.subtotal + this.costoEnvio;
  }

  pagar() {
    if (this.pago.metodo === 'wallet' && !this.pago.wallet) {
      alert('Por favor, selecciona Yape o Plin.');
      return;
    }

    const anioActual = new Date().getFullYear().toString();
    const claveContador = `contadorPedidos_${anioActual}`;
    let ultimoNumero = parseInt(localStorage.getItem(claveContador) || '0');
    ultimoNumero++;
    localStorage.setItem(claveContador, ultimoNumero.toString());
    const codigoPedido = `${anioActual}-${ultimoNumero.toString().padStart(4, '0')}-FARMA`;

    const usuarioData = localStorage.getItem('usuarioActivo');
    const usuario = usuarioData ? JSON.parse(usuarioData) : null;

    const resumen = {
      ...this.pago,
      metodoEnvio: this.tipoEnvio,
      costoEnvio: this.costoEnvio,
      total: this.total,
      subtotal: this.subtotal,
      carrito: this.carrito,
      codigoPedido,
      tiempoEstimado: this.tipoEnvio === 'domicilio' ? '2 días' : '1 día',
      fecha: new Date().toLocaleString(),
      nombre: usuario?.nombre || '',
      apellido: usuario?.apellido || '',
      direccion: usuario?.direccion || localStorage.getItem('direccion') || ''
    };

    localStorage.setItem('pagoResumen', JSON.stringify(resumen));

    const email = usuario?.email || 'invitado@farmasol.com';
    const historial = JSON.parse(localStorage.getItem('historialPedidos') || '{}');
    if (!historial[email]) historial[email] = [];
    historial[email].push(resumen);
    localStorage.setItem('historialPedidos', JSON.stringify(historial));

    // Mostrar alerta visual
    this.pagoExitoso = true;

    // Vaciar carrito y limpiar datos
    this.carritoService.vaciarCarrito();
    localStorage.removeItem('datosEnvio');

    // Oculta el mensaje y redirige después de 1.5 segundos
    setTimeout(() => {
      this.pagoExitoso = false;
      this.router.navigate(['/pago-resumen']);
    }, 1500);
  }

  formatearFechaExpiracion(event: any) {
    let input = event.target.value.replace(/\D/g, '');
    if (input.length >= 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4);
    }
    this.pago.expiracion = input;
  }

  volver(): void {
    this.router.navigate(['/envio']);
  }
}
