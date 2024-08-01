import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  // {path: 'empleado/:id', loadChildren: () => import('./pages/empleado/empleado.component').then(m => m.EmpleadoComponent)},
  {
    path: 'empleado/:id',
    loadComponent: () =>
      import('./pages/empleado/empleado.component').then(
        (m) => m.EmpleadoComponent
      ),
  },
];
