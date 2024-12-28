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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: User | null = null;

  constructor() {
    // Lyssna på autentiseringsstatus
    auth.onAuthStateChanged((user) => {
      this.currentUser = user;
      console.log('Användaren är:', user);
    });
  }

  // Registrera användare
  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Logga in användare med uthållighet
  async login(email: string, password: string) {
    try {
      await setPersistence(auth, browserLocalPersistence);
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error('Inloggning misslyckades:', error);
      throw error;
    }
  }

  // Logga ut användare
  logout() {
    return signOut(auth);
  }

  // Hämta aktuell användare
  getCurrentUser(): User | null {
    return this.currentUser;
  }
}
