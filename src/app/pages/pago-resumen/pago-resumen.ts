import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../core/services/carrito';

@Component({
  selector: 'app-pago-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-resumen.html',
  styleUrls: ['./pago-resumen.css']
})
export class PagoResumen implements OnInit {
  resumen: any = null;
  usuario: any = null;
  descripcionMetodoPago: string = '';

  private router = inject(Router);
  private carritoService = inject(CarritoService);

  ngOnInit(): void {
    this.cargarUsuarioActivo(() => {
      this.cargarResumen();

      if (!this.resumen) return;

      const claveGuardado = `pedidoGuardado_${this.resumen.codigoPedido}`;
      const yaGuardado = localStorage.getItem(claveGuardado);

      if (!yaGuardado) {
        this.guardarEnHistorial(this.resumen);
        localStorage.setItem(claveGuardado, 'true');
        this.carritoService.vaciarCarrito();
      }
    });
  }

  cargarResumen() {
    const data = localStorage.getItem('pagoResumen');
    if (data) {
      this.resumen = JSON.parse(data);
      this.setDescripcionMetodo();
    }
  }

  cargarUsuarioActivo(callback: () => void) {
    const usuarioActual = localStorage.getItem('usuarioActivo');
    if (!usuarioActual) return callback();

    try {
      const obj = JSON.parse(usuarioActual);
      if (obj && obj.email) {
        this.usuario = obj;
      }
    } catch {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
      this.usuario = usuarios[usuarioActual] || null;
    }

    callback();
  }

  setDescripcionMetodo() {
    const metodo = this.resumen?.metodo;
    if (metodo === 'contra') {
      this.descripcionMetodoPago = 'Contraentrega (Pago en efectivo)';
    } else if (metodo === 'tarjeta') {
      this.descripcionMetodoPago = 'Tarjeta de crédito/débito';
    } else if (metodo === 'wallet') {
      this.descripcionMetodoPago = `${this.resumen.wallet === 'yape' ? 'Yape' : 'Plin'} (Pago por QR)`;
    } else {
      this.descripcionMetodoPago = 'Método no especificado';
    }
  }

  get cantidadItems(): number {
    return this.resumen?.carrito?.reduce((sum: number, item: any) => sum + item.cantidad, 0) || 0;
  }

  irAlCatalogo(): void {
    this.router.navigate(['/productos']);
  }

  guardarEnHistorial(pedido: any) {
    const historialStr = localStorage.getItem('historialPedidos');
    let historialPorUsuario: { [email: string]: any[] } = {};

    try {
      historialPorUsuario = historialStr ? JSON.parse(historialStr) : {};
    } catch (e) {
      console.error('Error al parsear historialPedidos', e);
    }

    const email = this.usuario?.email || 'invitado@temporal.com';
    pedido.email = email;
    pedido.distrito = this.usuario?.distrito || 'No especificado';
    pedido.departamento = this.usuario?.departamento || 'No especificado';

    if (!historialPorUsuario[email]) {
      historialPorUsuario[email] = [];
    }

    historialPorUsuario[email].push(pedido);
    localStorage.setItem('historialPedidos', JSON.stringify(historialPorUsuario));
  }
}
