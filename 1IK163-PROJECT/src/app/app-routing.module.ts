import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; // Standalone HomeComponent
import { AboutComponent } from './pages/about/about.component'; // Standalone AboutComponent
import { AuthGuard } from './core/auth.guard'; // AuthGuard
import { LoginComponent } from './pages/login/login.component'; // LoginComponent
import { RegisterComponent } from './pages/register/register.component'; // RegisterComponent
import { ProtectedComponent } from './pages/protected/protected.component'; // ProtectedComponent

const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'protected', loadComponent: () => import('./pages/protected/protected.component').then(m => m.ProtectedComponent), canActivate: [AuthGuard] },
  { path: 'airplanes', loadComponent: () => import('./pages/airplanes/airplanes.component').then(m => m.AirplanesComponent) },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Registrerar rutterna
  exports: [RouterModule], // Exporterar router så den kan användas
})
export class AppRoutingModule {}
