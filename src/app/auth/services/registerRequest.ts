export interface RegisterRequest {
  email: string;
  nombre: string;
  apellido: string;
  telefono: string;
  password?: string;
  tipoDocumento?: string;
  numeroDocumento?: string;
  direccion?: string;
  departamento?: string;
  distrito?: string;
  codigoZip?: string;
  referencia?: string;
}
