import { Routes } from '@angular/router';

// Páginas principales
import { CatalogoPrincipal } from './pages/catalogo/catalogo-principal/catalogo-principal';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto';
import { CarritoPrincipal } from './pages/carrito/carrito-principal/carrito-principal';
import { EnvioComponent } from './pages/envio/tipo-envio/tipo-envio';
import { Pago } from './pages/pago/pago';
import { PagoResumen } from './pages/pago-resumen/pago-resumen';
import { Historial } from './pages/historial/historial';

// Secciones informativas
import { Nosotros } from './pages/nosotros/nosotros';
import { Contacto } from './pages/contacto/contacto';
import { TerminosCondiciones } from './pages/terminos-condiciones/terminos-condiciones';
import { PoliticaPrivacidad } from './pages/politica-privacidad/politica-privacidad';

// Autenticación
import { LoginComponent } from './auth/login/login';
import { Register } from './auth/register/register';

export const routes: Routes = [
  { path: '', component: CatalogoPrincipal },
  { path: 'productos', component: CatalogoPrincipal },
  { path: 'producto/:id', component: DetalleProductoComponent },
  { path: 'carrito', component: CarritoPrincipal },
  { path: 'envio', component: EnvioComponent },
  { path: 'pago', component: Pago },
  { path: 'pago-resumen', component: PagoResumen },

  // Informativos
  { path: 'nosotros', component: Nosotros },
  { path: 'contacto', component: Contacto },
  { path: 'terminos-condiciones', component: TerminosCondiciones},
  { path: 'politica-privacidad', component: PoliticaPrivacidad },

  // Autenticación
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: Register },

  // Historial de pedidos
  { path: 'historial', component: Historial },

  // Redirección para rutas no existentes
  { path: '**', redirectTo: 'productos', pathMatch: 'full' }
];
