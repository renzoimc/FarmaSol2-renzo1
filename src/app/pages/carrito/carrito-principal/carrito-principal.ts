import { Component, inject, OnInit } from '@angular/core';
//import { CarritoService } from '../../services/carrito';
//import { CarritoModel } from '../../models/carrito-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../../../core/services/carrito';
import { CarritoModel } from '../../../core/models/carrito-model';


@Component({
  selector: 'app-carrito-principal',
  standalone: true,
  imports: [CommonModule , FormsModule], // para dar formato a numeros decimales
  templateUrl: './carrito-principal.html',
  styleUrl: './carrito-principal.css'
})



export class CarritoPrincipal implements OnInit{
  // Variable publica para acceder desde carrito-principal.html
  // inyectar el servicio carritoService
  public carritoService = inject(CarritoService); 
  listCarrito: CarritoModel[] = [];

    //Llama al método getListCarrito para cargar la lista de items del carrito.
    ngOnInit(): void {
      this.getListCarrito();
    }

    //Recupera la lista de productos almacenados en el carrito
    getListCarrito(){
      this.listCarrito = this.carritoService.getCarrito();
    }

    // Cambia la cantidad del producto sumando o restando
    cambiarCantidad(item: CarritoModel, cambio: number, index: number) {
      const nuevaCantidad = item.cantidad + cambio;
      if (nuevaCantidad >= 1) {
        this.carritoService.actualizar(index, nuevaCantidad);
        this.getListCarrito();
      }
    }

    //Elimina un producto del carrito.
    eliminarItem(index: number){
      this.carritoService.eliminar(index);
      this.getListCarrito();
    }

    //No permite editar con teclado la cantidad
    onkeyDown(event: any){
      event.preventDefault();
    }

    //Actualiza la cantidad de un producto en el carrito.
    actualizar( item: CarritoModel , index: number){
      this.carritoService.actualizar(index , item.cantidad);
    }

    constructor(private router: Router) {
    }
    continuarCompra() {
    this.router.navigate(['/envio']);
}

}
