import { Injectable } from '@angular/core';
import { CarritoModel } from '../models/carrito-model';
import { ProductoModel } from '../models/producto-model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listCarrito: CarritoModel[] = [];

  // Devuelve toda la lista del carrito
  getCarrito(){
    this.obtenerSession();
    return this.listCarrito; 
  }

  // Acumula o crea un NUEVO item al carrito de compras
  agregar(producto: ProductoModel, cantidad: number = 1){
    this.obtenerSession(); 
    const index = this.listCarrito.findIndex(item => item.producto.id == producto.id);

    if(index == -1){
      // si no existe, se crear nuevo item
      const item = new CarritoModel(producto , cantidad);
      this.listCarrito.push(item);
    }else{
      // Si el producto ya está en el carrito
      this.actualizar(index, this.listCarrito[index].cantidad + cantidad);
    }
    this.guardarSession(); 
  }

  // Actualiza la cantidad de un producto en el carrito
  actualizar(index: number , cantidad: number){
    if(index>=0 && index < this.listCarrito.length){
      this.listCarrito[index].cantidad = cantidad;
    }
    this.guardarSession();
  }

  // Devuelve la cantidad de ítems distintos en el carrito (se muestra en el header.html)
  cantidad(){
    this.obtenerSession();
    return this.listCarrito.length;
  }

  // Calcula el importe total acumulado del carrito
  total(){
    const total = this.listCarrito.reduce((sum , item) => 
      sum + item.producto.precio * item.cantidad , 0
    );
    return total; // devuelve total
  }

  // Elimina un producto del carrito según su índice
  eliminar(index:number){
    if(index>=0 && index < this.listCarrito.length){
      this.listCarrito.splice(index , 1);
    }
    this.guardarSession();
  }

     
  // Guarda el estado actual del carrito en localStorage
  guardarSession(){
    localStorage.setItem('carrito' , JSON.stringify(this.listCarrito));
  }

  // Recupera los datos del carrito desde localStorage
  obtenerSession(){
    this.listCarrito = [];

    if(typeof window != 'undefined' && window.localStorage){
      const carrito = localStorage.getItem('carrito');
      if(carrito !=null){
        this.listCarrito = JSON.parse(carrito);
      }
    }
  }
}
