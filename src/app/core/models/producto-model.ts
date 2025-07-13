/*export class ProductoModel {
    id!: number;
    nombre!: string;
    precio!: number;
    imagen!: string;
    descripcion!: string;
    tipo!: string;
}*/
export interface ProductoModel {
  id_producto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  stock: number;
  tipo: string;
}


