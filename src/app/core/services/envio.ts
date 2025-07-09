import { Injectable } from '@angular/core';

export type TipoEnvio = 'domicilio' | 'tienda';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {
  private tipoEnvio: TipoEnvio = 'domicilio';
  private direccionCliente: string = '';  // Luego vendrá del usuario
  private distritoCliente: string = '';   // Para calcular costo de envío

  constructor() {}

  // Establece el tipo de envío elegido
  setTipoEnvio(tipo: TipoEnvio) {
    this.tipoEnvio = tipo;
  }

  getTipoEnvio(): TipoEnvio {
    return this.tipoEnvio;
  }

  setDireccionCliente(direccion: string, distrito: string) {
    this.direccionCliente = direccion;
    this.distritoCliente = distrito;
  }

  getDireccionCliente(): string {
    return this.direccionCliente;
  }

  getDistritoCliente(): string {
    return this.distritoCliente;
  }

  // Lógica para calcular el costo según distrito
  getCostoEnvio(): number {
    if (this.tipoEnvio === 'tienda') {
      return 0;
    }

    if (this.distritoCliente.toLowerCase() === 'carmen de la legua') {
      return 2.50;
    }

    // Por defecto
    return 0.00;
  }
}
