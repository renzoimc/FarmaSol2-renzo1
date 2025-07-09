import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EnvioService } from '../../../core/services/envio';

@Component({
  selector: 'app-envio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tipo-envio.html',
  styleUrls: ['./tipo-envio.css']
})
export class EnvioComponent implements OnInit {
  metodoEnvio: string = 'domicilio'; // por defecto
  direccion: string = '';
  distrito: string = '';
  referencia: string = '';
  departamento: string = '';

  private router = inject(Router);
  private envioService = inject(EnvioService); // Inyectamos el servicio

  ngOnInit(): void {
    const usuarioActual = localStorage.getItem('usuarioActivo');

    if (usuarioActual) {
      let usuario: any;
      if (usuarioActual.includes('{')) {
        usuario = JSON.parse(usuarioActual);
      } else {
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '{}');
        usuario = usuarios[usuarioActual];
      }

      if (usuario) {
        this.direccion = usuario.direccion || '';
        this.distrito = usuario.distrito || '';
        this.referencia = usuario.referencia || '';
        this.departamento = usuario.departamento || '';
      }
    }
  }

  continuar() {
    if (this.metodoEnvio === 'domicilio' && (!this.direccion || !this.distrito || !this.departamento)) {
      alert('Por favor completa la dirección de envío.');
      return;
    }

    // 
    this.envioService.setTipoEnvio(this.metodoEnvio as 'domicilio' | 'tienda');
    this.envioService.setDireccionCliente(this.direccion, this.distrito);
    const costo = this.envioService.getCostoEnvio();

    const datosEnvio = {
      metodoEnvio: this.metodoEnvio,
      direccion: this.direccion,
      distrito: this.distrito,
      departamento: this.departamento,
      referencia: this.referencia,
      costoEnvio: costo 
    };

    localStorage.setItem('datosEnvio', JSON.stringify(datosEnvio));
    this.router.navigate(['/pago']);
  }
}
