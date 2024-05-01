import { Component } from '@angular/core';
import { AdoptaService } from '../serv1/adopta.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { CitasService } from '../serv2/citas.service';
import { Citas } from '../citas';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-datos-citas',
  standalone: true,
  providers: [provideNativeDateAdapter(), DatePipe],
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, NgxMaterialTimepickerModule, FormsModule],
  templateUrl: './datos-citas.component.html',
  styleUrl: './datos-citas.component.css'
})

export class DatosCitasComponent {
  animalSeleccionado: any;
  cliente!: Citas;

  constructor(public adoptaService:AdoptaService, public activatedRoute:ActivatedRoute, public citasService: CitasService, public datePipe: DatePipe, private router: Router){
    this.activatedRoute.params.subscribe(params => {
      this.animalSeleccionado=adoptaService.getUnAnimal(params['index']);
    })
  }

  ngOnInit(){
    this.cliente = this.citasService.nuevoCliente();
  }

  nuevoCliente():void{
 
    this.cliente.imagen = this.animalSeleccionado.imagen;
    this.cliente.nombre = this.animalSeleccionado.nombre;
    this.cliente.edad = this.animalSeleccionado.edad;
    this.cliente.sexo = this.animalSeleccionado.sexo;
    this.cliente.color = this.animalSeleccionado.color;
    this.cliente.raza = this.animalSeleccionado.raza;
    this.cliente.tiempoR = this.animalSeleccionado.tiempoR;
    this.cliente.comportamiento = this.animalSeleccionado.comportamiento;
    this.citasService.agregarCliente(this.cliente);
    this.cliente = this.citasService.nuevoCliente();
    
  }



  validarYEnviar(): void {
    // Verifica que todos los campos requeridos estén llenos
    if (!this.cliente.fechaCte || !this.cliente.horaCte || !this.cliente.nombreCte || !this.cliente.telCte) {
      // Muestra un mensaje de error si algún campo está vacío
      this.datosNoEnviados();
      return; // Detiene la ejecución del método
    }


    // Verificar si la fecha y hora seleccionadas ya están ocupadas
    const clientes = this.citasService.getClientes(); // Obtener lista de clientes del servicio
    const citaExistente = clientes.find(cita => cita.fechaCte === this.cliente.fechaCte && cita.horaCte === this.cliente.horaCte);

    if (citaExistente) {
      // Si la cita ya existe, muestra un mensaje de error
      this.citaExistente();
      return; // Detiene la ejecución del método
    }


    // Verificar si el nombre de la mascota ya está en proceso de adopción
    if (this.nombreEnAdopcion(this.animalSeleccionado.nombre)) {
      // Si el nombre de la mascota está en proceso de adopción, muestra un mensaje
      this.mascotaEnAdopcion();
      return; // Detiene la ejecución del método
    }

    // Si todos los campos están llenos y no hay citas existentes, procede a agregar la nueva cita
    this.confirmacion();
  }


  nombreEnAdopcion(nombre: string): boolean {
    // Obtener lista de clientes del servicio
    const clientes = this.citasService.getClientes(); 
    // Verificar si el nombre de la mascota ya está en el localStorage
    return clientes.some(cliente => cliente.nombre === nombre);
  }

  formatoFecha() {
    // Formatear la fecha al formato deseado
    this.cliente.fechaCte = this.datePipe.transform(this.cliente.fechaCte, 'yyyy-MM-dd');
  }



  //ALERTS
  citaExistente(): void {
    Swal.fire({
      title: 'No se puede agendar la cita',
      text: 'Ya hay una cita agendada en la fecha y hora seleccionadas',
      icon: 'error'
    });
  }

 
  mascotaEnAdopcion(): void {
    Swal.fire({
      title: 'Lo sentimos',
      text: 'Esta mascota ya está en proceso de adopción',
      icon: 'error'
    });
  }

  datosNoEnviados(): void {
    Swal.fire({
      title: 'Error al enviar los datos',
      text: 'Completa todos los campos para agendar la cita',
      icon: 'error'
    });
  }

  confirmacion(): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estas seguro que deseas agendar la cita?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar Cita",
      confirmButtonText: "Agendar Cita",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Datos enviados exitosamente!!",
          text: "Presentate el dia y la hora seleccionada",
          icon: "success"
        });

        this.nuevoCliente();
        this.router.navigate(['/adopciones']);
        // this.datosEnviados();
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelacion exitosa",
          text: "Los datos no han sido enviados",
          icon: "error"
        });
        return;
      }
    });
  }
  
  


}
