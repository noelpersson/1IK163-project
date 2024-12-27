import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // Standalone HomeComponent
import { AboutComponent } from './pages/about/about.component'; // Standalone AboutComponent

const routes: Routes = [
  { path: '', component: HomeComponent }, // Startsidan
  { path: 'about', component: AboutComponent }, // Om-sidan
  { path: '**', redirectTo: '' }, // Fångar ogiltiga rutter
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Registrerar rutterna
  exports: [RouterModule], // Exporterar router så den kan användas
})
export class AppRoutingModule {}
