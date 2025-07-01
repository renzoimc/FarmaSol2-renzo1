import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../core/services/producto';
import { CarritoService } from '../../core/services/carrito';
import { ProductoModel } from '../../core/models/producto-model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalle-producto.html',
  styleUrls: ['./detalle-producto.css']
})
export class DetalleProductoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productoService = inject(ProductoService);
  private carritoService = inject(CarritoService);

  producto: ProductoModel | null = null;
  cantidad: number = 1;
  mensajeAgregado: boolean = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productoService.getProductos().subscribe({
      next: (productos) => {
        this.producto = Array.isArray(productos)
          ? productos.find(p => p.id === id) ?? null
          : null;
      },
      error: (e) => {
        console.error('Error al obtener productos', e);
        this.producto = null;
      }
    });
  }

agregarAlCarrito(): void {
  if (this.producto) {
    this.carritoService.agregar(this.producto, this.cantidad);
    this.mensajeAgregado = true;

    // Ocultar el mensaje después de 2 segundos
    setTimeout(() => {
      this.mensajeAgregado = false;
    }, 2000);
  }
}


cambiarCantidad(valor: number): void {
  const nuevaCantidad = this.cantidad + valor;
  if (nuevaCantidad >= 1) {
    this.cantidad = nuevaCantidad;
  }
}


irAlCarrito(): void {
  this.router.navigate(['/carrito']);
}
volver(): void {
  this.router.navigate(['/productos']);
}


}
