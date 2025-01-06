import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async onLogin() {
    try {
      await this.authService.login(this.email, this.password);
      console.log('Inloggning lyckades. Navigerar till dashboard.');
      this.router.navigate(['/dashboard']).then((success) => {
        if (success) {
          console.log('Navigering lyckades.');
        } else {
          console.error('Navigering misslyckades.');
        }
      });
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'Användaren finns inte. Kontrollera din e-postadress.';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'Fel lösenord. Försök igen.';
      } else {
        this.errorMessage = 'Inloggning misslyckades: ' + error.message;
      }
    }
  }
}
