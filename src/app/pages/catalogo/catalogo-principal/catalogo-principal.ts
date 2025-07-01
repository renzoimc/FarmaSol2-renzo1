import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ProductoService } from '../../../core/services/producto';
import { CarritoService } from '../../../core/services/carrito';
import { ProductoModel } from '../../../core/models/producto-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-catalogo-principal',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './catalogo-principal.html',
  styleUrls: ['./catalogo-principal.css']
})
export class CatalogoPrincipal implements OnInit {
  // Inyectamos servicios necesarios
  private productoService = inject(ProductoService); // servicio para obtener productos
  private carritoService = inject(CarritoService);     // servicio para manejar carrito
  private router = inject(Router);                    // router para navegación

  productos: ProductoModel[] = []; // lista cargada desde el backend

  ngOnInit(): void {
    this.getProductos(); // al iniciar, obtenemos el listado
  }

  getProductos() {
    this.productoService.getProductos().subscribe({
      next: data => this.productos = data,
      error: e => console.error(e)
    });
  }

  /**
   * Agrega un producto al carrito de compras.
   */
  agregarProducto(item: ProductoModel) {
    this.carritoService.agregar(item);
  }

  /**
   * Navega al componente de detalle de producto.
   * @param id Identificador del producto
   */
  verDetalle(id: number) {
    this.router.navigate(['/producto', id]);
  }

  /**
   * trackBy para optimizar *ngFor y evitar re-renderizados innecesarios.
   */
  trackById(index: number, item: ProductoModel) {
    return item.id;
  }
}
