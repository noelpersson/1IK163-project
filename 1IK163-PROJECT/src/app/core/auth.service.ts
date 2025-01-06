import { Injectable } from '@angular/core';
import { auth } from './firebase.config';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    // Lyssna på autentiseringsstatus och uppdatera BehaviorSubject
    auth.onAuthStateChanged((user) => {
      this.currentUserSubject.next(user);
      console.log('Användaren är:', user);
    });
  }

  // Observable för autentiseringstillstånd
  get authState(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }

  // Registrera användare och logga ut direkt efter registrering
  async register(email: string, password: string): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Användare skapad:', userCredential.user);
      
      // Logga ut användaren omedelbart efter registrering
      await signOut(auth);
      console.log('Användaren har loggats ut efter registrering.');
    } catch (error) {
      console.error('Registrering misslyckades:', error);
      throw error; // Vidarebefordra felet för hantering i komponenten
    }
  }

  // Logga in användare med uthållighet
  async login(email: string, password: string): Promise<void> {
    try {
      await setPersistence(auth, browserLocalPersistence); // Håll användaren inloggad mellan sessioner
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Inloggad som:', userCredential.user);
    } catch (error) {
      console.error('Inloggning misslyckades:', error);
      throw error; // Vidarebefordra felet för hantering i komponenten
    }
  }

  // Logga ut användare
  async logout(): Promise<void> {
    try {
      await signOut(auth);
      console.log('Användaren har loggats ut.');
    } catch (error) {
      console.error('Utloggning misslyckades:', error);
      throw error;
    }
  }

  // Hämta aktuell användare
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
