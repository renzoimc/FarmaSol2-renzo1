import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pago-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago-resumen.html',
  styleUrl: './pago-resumen.css'
})
export class PagoResumen implements OnInit {
  resumen: any = null;  // Aquí se guardará toda la info del pedido
  descripcionMetodoPago: string = ''; // Texto amigable para mostrar en HTML

  // Al iniciar, obtenemos el resumen del pedido desde localStorage
  ngOnInit(): void {
    const data = localStorage.getItem('pagoResumen');
    if (data) {
      this.resumen = JSON.parse(data); // Convertimos el string en objeto JS
      this.setDescripcionMetodo(); // Generamos el texto descriptivo del método de pago
    }
  }

  // Calculamos la cantidad total de productos comprados
  get cantidadItems(): number {
    if (!this.resumen || !this.resumen.carrito) return 0;
    return this.resumen.carrito.reduce((sum: number, item: any) => sum + item.cantidad, 0);
  }

  // Asigna un texto más claro al método de pago
  setDescripcionMetodo() {
    const metodo = this.resumen.metodo;
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
}
