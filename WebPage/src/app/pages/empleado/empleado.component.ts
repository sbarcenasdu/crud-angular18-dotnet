import { Component, inject, Input, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { EmpleadoService } from '../../services/empleado.service';
import { Router } from '@angular/router';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div
      class="mat-elevation-z2"
      style="width: 30%; padding: 30px; margin: 50px auto; display: flex;justify-content: center;"
    >
      <form [formGroup]="formEmpleado">
        <div class="flex">
          <mat-form-field>
            <mat-label>Nombre Completo</mat-label>
            <input matInput formControlName="nombreCompleto" />
          </mat-form-field>
        </div>
        <div class="flex">
          <mat-form-field>
            <mat-label>Correo</mat-label>
            <input matInput formControlName="correo" />
          </mat-form-field>
        </div>
        <div class="flex">
          <mat-form-field>
            <mat-label>Sueldo</mat-label>
            <input matInput type="number" formControlName="sueldo" />
          </mat-form-field>
        </div>
        <div class="flex">
          <mat-form-field>
            <mat-label>Fecha Contrato</mat-label>
            <input matInput formControlName="fechaContrato" />
          </mat-form-field>
        </div>

        <div class="flex">
          <button mat-flat-button color="primary" (click)="guardarCambios()">
            Guardar
          </button>
          <button
            mat-flat-button
            color="warn"
            (click)="volver()"
            style="margin-left: 8px;"
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  `,
  styles: ``,
})
export class EmpleadoComponent implements OnInit {
  @Input('id') idEmpleado!: number;
  private empleadoServicio = inject(EmpleadoService);
  private router = inject(Router);
  formBuild = inject(FormBuilder);

  ngOnInit() {
    if (this.idEmpleado != 0) {
      this.iniciarFormEmpleado();
    }
  }

  formEmpleado = this.formBuild.group({
    nombreCompleto: ['', Validators.required],
    correo: ['', Validators.required],
    sueldo: [0, Validators.required],
    fechaContrato: ['', Validators.required],
  });

  iniciarFormEmpleado() {
    this.empleadoServicio.obtenerEmpleado(this.idEmpleado).subscribe({
      next: (data) => {
        this.formEmpleado.patchValue({
          nombreCompleto: data.nombreCompleto,
          correo: data.correo,
          sueldo: data.sueldo,
          fechaContrato: data.fechaContrato,
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  guardarCambios() {
    if (this.formEmpleado.valid) {
      const formValue = this.formEmpleado.value;

      const empleadoData: Empleado = {
        idEmpleado: this.idEmpleado,
        nombreCompleto: formValue.nombreCompleto!,
        correo: formValue.correo!,
        sueldo: formValue.sueldo!,
        fechaContrato: formValue.fechaContrato!,
      };

      if (this.idEmpleado == 0) {
        this.empleadoServicio.agregarEmpleado(empleadoData).subscribe({
          next: (data) => {
            if (data.isSuccess) {
              this.router.navigate(['/']);
            } else console.error('Error al agregar el empleado');
          },
          error: (error) => {
            console.error(error);
          },
        });
      } else {
        this.empleadoServicio.actualizarEmpleado(empleadoData).subscribe({
          next: (data) => {
            if (data.isSuccess) {
              this.router.navigate(['/']);
            } else console.error('Error al actualizar el empleado');
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
