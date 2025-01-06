import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; // För formulärhantering
import { MatDialogModule } from '@angular/material/dialog'; // För dialoger
import { AppComponent } from './app.component'; // Huvudkomponenten

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Behövs för Angular Material
    FormsModule, // Hanterar formulär och ngModel
    MatDialogModule, // För att visa dialoger
  ],
})
export class AppModule {}
