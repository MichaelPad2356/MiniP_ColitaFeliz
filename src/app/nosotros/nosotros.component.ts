import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [],
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit {
  videoUrl: SafeResourceUrl | null = null; // Inicializamos a null

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const videoUrlString = 'https://www.youtube.com/watch?v=zQ6CB4pZIYs';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrlString);
  }
}