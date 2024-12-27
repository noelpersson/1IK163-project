import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Importera routingmodulen

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    AppRoutingModule, // Importera AppRoutingModule
  ],
})
export class AppModule {}
