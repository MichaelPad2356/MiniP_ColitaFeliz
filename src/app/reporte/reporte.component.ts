import { Component, OnInit } from '@angular/core';
import { Citas } from '../citas';
import { animPeGa } from '../animales';
import { CitasService } from '../serv2/citas.service';
import { AdoptaService } from '../serv1/adopta.service';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [DatePipe, MatButtonModule,  MatCardModule,],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
})


export class ReporteComponent implements OnInit{
  citasAnteriores: Citas[] = [];
  citasPendientes: Citas[] = [];
  animales: animPeGa[] = [];
  animalesDisponibles: animPeGa[] = [];
  mostrarCitasAnteriores = false;
  mostrarCitasPendientes = false;
 

  constructor(private citasService: CitasService, private adoptaService: AdoptaService){}

  ngOnInit(){
    this.obtenerCitas();
    this.obtenerAnimales();
      
  }

  obtenerCitas(){
    //obtener todas las citas almacenadas
    const todasCitas = this.citasService.getClientes();


    //Filtrar citas anteriores y pendientes al dia actual
    const fechaActual = new Date();
    this.citasAnteriores = todasCitas.filter(cita => cita.fechaCte && new Date(cita.fechaCte) < fechaActual);
    this.citasPendientes = todasCitas.filter(cita => cita.fechaCte && new Date(cita.fechaCte) >= fechaActual);
  }


  obtenerAnimales(){
    //obtener animales disponibles
    this.animales = this.adoptaService.getAnimales();

    // Filtrar animales disponibles que no tienen citas anteriores ni pendientes
    this.animalesDisponibles = this.animales.filter(animal => !this.tieneCitaAnterior(animal) && !this.tieneCitaPendiente(animal));
  }


  esMascotaAdoptada(nombreMascota: string): boolean {
    // Comprobar si la mascota está en el localStorage como adoptada
    const mascotasAdoptadas = JSON.parse(localStorage.getItem('mascotasAdoptadas') || '[]');
    return mascotasAdoptadas.includes(nombreMascota);
  }
  
  tieneCitaAnterior(animal: animPeGa): boolean {
    // Comprobar si el animal tiene citas anteriores
    return this.citasAnteriores.some(cita => cita.nombreCte === animal.nombre);
  }

  tieneCitaPendiente(animal: animPeGa): boolean {
    // Comprobar si el animal tiene citas pendientes
    return this.citasPendientes.some(cita => cita.nombreCte === animal.nombre);
  }

  trackByCita(index: number, cita: Citas): string {
    return cita.nombreCte + cita.fechaCte + cita.horaCte;
  }

  trackByAnimal(index: number, animal: animPeGa): string {
    return animal.nombre;
  }


}
