import { Component } from '@angular/core';
import { AdoptaService } from '../serv1/adopta.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-datos-citas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [RouterModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule],
  templateUrl: './datos-citas.component.html',
  styleUrl: './datos-citas.component.css'
})

export class DatosCitasComponent {
  animalSeleccionado: any;

  constructor(public adoptaService:AdoptaService, public activatedRoute:ActivatedRoute){
    this.activatedRoute.params.subscribe(params => {
      this.animalSeleccionado=adoptaService.getUnAnimal(params['index']);
    })
  }


}
