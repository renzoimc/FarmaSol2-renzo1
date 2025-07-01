import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tipo-envio',
  standalone: true, // importante si estás usando standalone components
  imports: [CommonModule, FormsModule], // necesarios para *ngIf y [(ngModel)]
  templateUrl: './tipo-envio.html',
  styleUrls: ['./tipo-envio.css']
})
export class TipoEnvio {
  // Opción seleccionada ('domicilio' o 'tienda')
  tipoEnvio: string = 'domicilio';

  // Dirección del cliente, simulada por ahora
  direccionCliente: string = 'Av. Jose Lopez Pasos 1023, Carmen de la Legua, Callao';

  constructor(private router: Router) {}

  /**
   * Acción al presionar "Continuar"
   */
  continuar(): void {
    console.log('Tipo de envío seleccionado:', this.tipoEnvio);
    localStorage.setItem('tipoEnvio', this.tipoEnvio); // <-- Guarda temporalmente
    this.router.navigate(['/pago']); // o la ruta que siga el flujo
  }

  volver(): void {
  this.router.navigate(['/carrito']);
}

}
