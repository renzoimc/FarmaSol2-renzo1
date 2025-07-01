import { RedirectCommand, Routes } from '@angular/router';
//import { CatalogoPrincipal } from './catalogo/catalogo-principal/catalogo-principal';
//import { CarritoPrincipal } from './carrito/carrito-principal/carrito-principal';
//import { Nosotros } from './page/nosotros/nosotros';
//import { Contacto } from './page/contacto/contacto';
//import { Pago } from './pago/pago';
import { CatalogoPrincipal } from './pages/catalogo/catalogo-principal/catalogo-principal';
import { CarritoPrincipal } from './pages/carrito/carrito-principal/carrito-principal';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contacto } from './pages/contacto/contacto';
import { Pago } from './pages/pago/pago';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto';
import { TipoEnvio } from './pages/envio/tipo-envio/tipo-envio';
import { PagoResumen } from './pages/pago-resumen/pago-resumen';

export const routes: Routes = [
    { path:'' , component: CatalogoPrincipal },
    {path:'carrito' , component: CarritoPrincipal},
    {path:'productos', component:CatalogoPrincipal},
    { path: 'producto/:id', component: DetalleProductoComponent},
    {path:'nosotros', component:Nosotros},
    {path:'contacto', component:Contacto},
    { path: 'envio', component: TipoEnvio },
    {path:'pago', component:Pago},
    {path: 'pago-resumen',  component: PagoResumen}
];
