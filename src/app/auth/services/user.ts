export interface User {
  id: string;
  // Datos personales
  nombre: string;
  apellido: string;
  email: string;
  telefono?: string;   // Teléfono fijo (opcional)
  celular?: string;    // Celular (lo estás usando en el formulario)
  password?: string;   // Clave opcional (puede estar vacía en invitados)

  // Documento de identidad
  tipoDocumento?: string;
  numeroDocumento?: string;

  // Dirección de envío
  direccion?: string;
  distrito?: string;
  departamento?: string;
  codigoZip?: string;         // También lo tienes como codigoZip en register.ts
  referencia?: string;
}
