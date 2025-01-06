import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-sucess-dialog',
  standalone: true,
  imports: [],
  templateUrl: './sucess-dialog.component.html',
  styleUrls: ['./sucess-dialog.component.css'], 
})
export class SucessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SucessDialogComponent>,
    private router: Router // Injicera Router
  ) {}

  goToLogin() {
   
    this.router.navigate(['/login']).then(() => {
      this.dialogRef.close(); 
  });
}
}
