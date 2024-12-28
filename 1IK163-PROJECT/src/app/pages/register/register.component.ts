import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true, // Gör komponenten standalone
  imports: [FormsModule, CommonModule], // Lägg till FormsModule här
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Lösenorden matchar inte.';
      return;
    }

  try {
    await this.authService.register(this.email, this.password);
    alert('Registrering lyckades! Du kommer nu omdirrigeras till inloggningssidan.');
    this.router.navigate(['/login']);
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      this.errorMessage = 'E-postadressen är redan registrerad.';
    } else {
      this.errorMessage = 'Registrering misslyckades. Försök igen senare.';
    }
  }
  }
}
