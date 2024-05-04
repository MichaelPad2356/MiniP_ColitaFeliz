
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomseguroPipe } from '../domseguro.pipe';

@Component({
  selector: 'app-nosotros', 
  standalone: true,
  imports: [RouterOutlet, DomseguroPipe],
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
 
})
export class NosotrosComponent {
  title = 'videoseguro';
  video:string="zQ6CB4pZIYs";

  title2 = 'videoseguro2';
  instalaciones:string="s1QUYZyQKjA";
  
}
