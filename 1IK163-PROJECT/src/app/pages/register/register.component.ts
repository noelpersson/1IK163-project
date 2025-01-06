import { Component } from '@angular/core';
import { AuthService } from '../../core/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { SucessDialogComponent } from '../../sucess-dialog/sucess-dialog.component';

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

  isLengthValid: boolean = false;
  hasUpperCase: boolean = false;
  hasLowerCase: boolean = false;
  hasSpecialChar: boolean = false;
  hasNumber: boolean = false;
  isPasswordValid: boolean = false;



  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {}

  validatePassword() {
    const specialCharPattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    this.isLengthValid = this.password.length >= 8;
    this.hasUpperCase = /[A-Z]/.test(this.password);
    this.hasLowerCase = /[a-z]/.test(this.password);
    this.hasSpecialChar = specialCharPattern.test(this.password);
    this.hasNumber = /[0-9]/.test(this.password);



  }

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Lösenorden matchar inte.';
      return;
    }
    if (!this.email || !this.email.includes('@')) {
      this.errorMessage = 'Ange en giltig e-postadress.';
      return;
    }
    
  
    try {
      await this.authService.register(this.email, this.password);
  
      // Öppna en dialog för att visa bekräftelse
      const dialogRef = this.dialog.open(SucessDialogComponent, {
        width: '400px',
        data: { message: 'Registrering lyckades! Du kan nu logga in.' }, // Skicka med data till dialogen
      });
  
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.errorMessage = 'E-postadressen är redan registrerad.';
      } else {
        this.errorMessage = 'Registrering misslyckades. Försök igen senare.';
      }
    }
  }
}
