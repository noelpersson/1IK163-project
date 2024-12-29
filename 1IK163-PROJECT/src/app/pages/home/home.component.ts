import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // För routing

@Component({
  selector: 'app-home',
  imports: [RouterModule], // Importera RouterModule
  standalone: true, // Gör komponenten standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
