import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdopcionesComponent } from './adopciones/adopciones.component';
import { DatosCitasComponent } from './datos-citas/datos-citas.component';
import { ReporteComponent } from './reporte/reporte.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'adopciones', component: AdopcionesComponent},
    {path: 'citas/:index', component: DatosCitasComponent},
    {path: 'reporte', component: ReporteComponent}
];
