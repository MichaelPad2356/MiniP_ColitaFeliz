import { Component, OnInit } from '@angular/core';
import { Citas } from '../citas';
import { animPeGa } from '../animales';
import { CitasService } from '../serv2/citas.service';
import { AdoptaService } from '../serv1/adopta.service';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import moment from 'moment-timezone';

const ZONA_HORARIA_CDMX = 'America/Mexico_City';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatCardModule],
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
})

export class ReporteComponent implements OnInit {
  citasAnteriores: Citas[] = [];
  citasPendientes: Citas[] = [];
  animales: animPeGa[] = [];
  animalesDisponibles: animPeGa[] = [];
  mostrarCitasAnteriores = false;
  mostrarCitasPendientes = false;

  constructor(private citasService: CitasService, private adoptaService: AdoptaService) {}

  ngOnInit(): void {
    this.obtenerCitas();
    this.obtenerAnimales();
  }

  obtenerCitas(): void {
    const todasCitas = this.citasService.getClientes();
    const fechaActualCDMX = moment().tz(ZONA_HORARIA_CDMX);

    this.citasAnteriores = todasCitas.filter((cita) =>
      cita.fechaCte && moment(cita.fechaCte).tz(ZONA_HORARIA_CDMX).isBefore(fechaActualCDMX)
    );
    this.citasPendientes = todasCitas.filter((cita) =>
      cita.fechaCte && moment(cita.fechaCte).tz(ZONA_HORARIA_CDMX).isSameOrAfter(fechaActualCDMX)
    );
  }

  obtenerAnimales(): void {
    this.animales = this.adoptaService.getAnimales();

    // Recuperar las mascotas guardadas en localStorage
    const mascotasEnAdopcion = localStorage.getItem('mascotasEnAdopcion');
    const mascotasEnAdopcionParsed = mascotasEnAdopcion ? JSON.parse(mascotasEnAdopcion) : null;

    // Comparar las mascotas en adopción con las disponibles
    for (let i = 0; i < this.animales.length; i++) {
      const animal = this.animales[i];
      if (mascotasEnAdopcionParsed && mascotasEnAdopcionParsed.includes(animal.nombre)) {
        // Si la mascota está en proceso de adopción, agregar un mensaje
         return;
      }
    }
    this.animalesDisponibles = this.animales.filter(
      (animal) => !this.tieneCitaAnterior(animal) && !this.tieneCitaPendiente(animal)
    );
  }


  tieneCitaAnterior(animal: animPeGa): boolean {
    return this.citasAnteriores.some((cita) => cita.nombreCte === animal.nombre);
  }

  tieneCitaPendiente(animal: animPeGa): boolean {
    return this.citasPendientes.some((cita) => cita.nombreCte === animal.nombre);
  }

  trackByCita(index: number, cita: Citas): string {
    return cita.nombreCte + cita.fechaCte + cita.horaCte;
  }

  trackByAnimal(index: number, animal: animPeGa): string {
    return animal.nombre;
  }

  
}