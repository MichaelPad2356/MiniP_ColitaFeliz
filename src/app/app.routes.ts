import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdopcionesComponent } from './adopciones/adopciones.component';
import { DatosCitasComponent } from './datos-citas/datos-citas.component';
import { BuscarComponent } from './buscar/buscar.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'adopciones', component: AdopcionesComponent},
    {path: 'citas/:index', component: DatosCitasComponent},
    {path: 'buscar', component: BuscarComponent},
    {path: 'nosotros', component: NosotrosComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
