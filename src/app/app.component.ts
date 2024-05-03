import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdopcionComponent } from './adopcion/adopcion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,AdopcionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'MP_ColitaFeliz';
}
