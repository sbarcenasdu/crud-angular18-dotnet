import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpleadoService } from '../../services/empleado.service';
import { Empleado } from '../../models/empleado';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatIconModule, MatButtonModule],
  template: `
    <mat-card style="margin:50px auto; width:70%">
      <mat-card-header>
        <mat-card-title>Lista de Empleados</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <button mat-flat-button (click)="nuevoEmpleado()">
          Nuevo Empleado
        </button>

        <table mat-table [dataSource]="listaEmpleados" class="mat-elevation-z8" style="margin-top: 20px;">

          <!-- Position Column -->
          <ng-container matColumnDef="nombreCompleto">
            <th mat-header-cell *matHeaderCellDef>Nombre Completo</th>
            <td mat-cell *matCellDef="let element">{{ element.nombreCompleto }}</td>
          </ng-container>

          <!-- Name Column -->
          <ng-container matColumnDef="correo">
            <th mat-header-cell *matHeaderCellDef>Correo</th>
            <td mat-cell *matCellDef="let element">{{ element.correo }}</td>
          </ng-container>

          <!-- Weight Column -->
          <ng-container matColumnDef="sueldo">
            <th mat-header-cell *matHeaderCellDef>Sueldo</th>
            <td mat-cell *matCellDef="let element">{{ element.sueldo }}</td>
          </ng-container>

          <!-- Symbol Column -->
          <ng-container matColumnDef="fechaContrato">
            <th mat-header-cell *matHeaderCellDef>FechaContrato</th>
            <td mat-cell *matCellDef="let element">{{ element.fechaContrato }}</td>
          </ng-container>

          <!-- Action Column -->
          <ng-container matColumnDef="acciones">
            <th mat-header-cell *matHeaderCellDef>Acciones</th>
            <td mat-cell *matCellDef="let element">
              <button mat-icon-button color="primary" (click)="editarEmpleado(element)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" aria-label="Example icon button with a delete icon" (click)="eliminarEmpleado(element)">
                <mat-icon>delete</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
        </table>
      </mat-card-content>
    </mat-card>
  `,
  styles: ``,
})
export class InicioComponent implements OnInit {
  private empleadoService = inject(EmpleadoService);
  private router = inject(Router);
  listaEmpleados: Empleado[] = [];
  displayedColumns: string[] = [
    'nombreCompleto',
    'correo',
    'sueldo',
    'fechaContrato',
    'acciones',
  ];

  ngOnInit() {
    this.obtenerEmpleados();
  }

  obtenerEmpleados() {
    this.empleadoService.obtenerEmpleados().subscribe({
      next: (empleados) => {
        if (empleados.length > 0) {
          this.listaEmpleados = empleados;
        }
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }

  nuevoEmpleado() {
    this.router.navigate(['/empleado', 0]);
  }

  editarEmpleado(objeto: Empleado) {
    this.router.navigate(['/empleado', objeto.idEmpleado]);
  }

  eliminarEmpleado(objeto: Empleado) {
    if (
      confirm('¿Está seguro de eliminar el registro? ' + objeto.nombreCompleto)
    ) {
      this.empleadoService.eliminarEmpleado(objeto.idEmpleado!).subscribe({
        next: (respuesta) => {
          if (respuesta.isSuccess) {
            this.obtenerEmpleados();
          }
        },
        error: (error) => {
          console.error(error.message);
        },
      });
    }
  }
}
