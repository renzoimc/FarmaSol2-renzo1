import { ProductoModel } from "./producto-model";

export class CarritoModel {
    producto: ProductoModel;  
    cantidad: number; // cantidad acumulada

    constructor(producto: ProductoModel, cantidad: number = 1){
        this.producto = producto;
        this.cantidad = cantidad;
    }

    
}
