import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Empleado } from '../models/empleado';
import { ResponseApi } from '../models/response-api';


@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private http = inject(HttpClient);
  private apiUrl = appsettings.apiUrl + 'Empleado';

  constructor() { }

  obtenerEmpleados() {
    return this.http.get<Empleado[]>(this.apiUrl);
  }

  obtenerEmpleado(id: number) {
    return this.http.get<Empleado>(`${this.apiUrl}/${id}`);
  }

  agregarEmpleado(empleado: Empleado) {
    return this.http.post<ResponseApi>(this.apiUrl, empleado);
  }

  actualizarEmpleado(empleado: Empleado) {
    return this.http.put<ResponseApi>(`${this.apiUrl}`, empleado);
  }

  eliminarEmpleado(id: number) {
    return this.http.delete<ResponseApi>(`${this.apiUrl}/${id}`);
  }
}



