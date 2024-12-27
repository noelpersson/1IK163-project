import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true, // Gör komponenten standalone
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();

}
