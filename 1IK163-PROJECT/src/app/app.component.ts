import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // För routing
import { HeaderComponent } from './shared/header/header.component'; // Standalone header
import { FooterComponent } from './shared/footer/footer.component'; // Standalone footer

@Component({
  selector: 'app-root',
  standalone: true, // Om AppComponent också är standalone
  imports: [
    RouterOutlet, // Importera router-outlet
    HeaderComponent, // Importera standalone HeaderComponent
    FooterComponent, // Importera standalone FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
