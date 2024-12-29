import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../core/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  isAuthenticated = false;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService) {}

  ngOnInit() {
    // Prenumerera på authState för att uppdatera isAuthenticated
    this.authService.authState.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  login() {
    console.log('Logga in knapp tryckt.');
    // Navigera till inloggningssidan eller visa en modal
  }

  logout() {
    this.authService.logout().then(() => {
      console.log('Användaren har loggat ut.');
    });
  }
}
