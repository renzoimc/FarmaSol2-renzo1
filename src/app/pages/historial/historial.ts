import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrls: ['./historial.css']
})
export class Historial implements OnInit {
  usuario: any = null;
  pedidos: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('usuarioActivo');

    if (!user) {
      this.router.navigate(['/login']);
      return;
    }

    try {
      this.usuario = JSON.parse(user);
    } catch (e) {
      console.error('Error al parsear usuarioActivo', e);
      this.router.navigate(['/login']);
      return;
    }

    this.cargarPedidosUsuario(this.usuario.email);
  }

  cargarPedidosUsuario(email: string): void {
    const historialStr = localStorage.getItem('historialPedidos');
    if (!historialStr) return;

    try {
      const historialPorUsuario = JSON.parse(historialStr);
      const pedidosUsuario = historialPorUsuario[email] || [];

      // Elimina pedidos duplicados por código de pedido
      const pedidosUnicosMap = new Map();
      for (const pedido of pedidosUsuario) {
        pedidosUnicosMap.set(pedido.codigoPedido, pedido);
      }

      //Ordena por fecha 
      this.pedidos = Array.from(pedidosUnicosMap.values()).sort((a: any, b: any) => {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
      });
    } catch (e) {
      console.error('Error al procesar historialPedidos', e);
      this.pedidos = [];
    }
  }
}
