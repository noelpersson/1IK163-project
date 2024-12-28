import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../core/firestore.services';
import { AuthService } from '../../core/auth.service';
import { auth } from '../../core/firebase.config'; // Importera din auth-instans
import { User } from 'firebase/auth'; //

@Component({
  selector: 'app-airplanes',
  imports: [FormsModule, CommonModule],
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.css'],
})
export class AirplanesComponent implements OnInit {
  favoritePlane: string = '';
  planes: { id: string; name: string }[] = [];
  partName: string = '';
  planeIdForPart: string = '';
  isAuthenticated: boolean = false;

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  // Kontrollera autentisering vid start
  ngOnInit() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.isAuthenticated = true;
        console.log('Användaren är autentiserad:', user.email);
        this.fetchFavoritePlanes(); // Hämta data om användaren är inloggad
      } else {
        this.isAuthenticated = false;
        console.error('Användaren är inte autentiserad.');
      }
    });
  }
  

  // Lägg till ett favoritflygplan
  async addFavoritePlane() {
    if (this.isAuthenticated && this.favoritePlane.trim()) {
      try {
        const planeData = { name: this.favoritePlane, addedAt: new Date() };
        const documentId = await this.firestoreService.addDocument('favoritePlanes', planeData);
        this.planes.push({ id: documentId, name: this.favoritePlane });
        this.favoritePlane = '';
      } catch (error) {
        console.error('Kunde inte lägga till flygplan:', error);
      }
    } else {
      console.error('Användaren är inte autentiserad eller data saknas.');
    }
  }

  // Lägg till en flygplansdel
  async addPlanePart() {
    if (this.isAuthenticated && this.planeIdForPart && this.partName.trim()) {
      try {
        const partData = { partName: this.partName, addedAt: new Date() };
        await this.firestoreService.addPlanePart(this.planeIdForPart, partData);
        this.partName = '';
        console.log(`Del '${this.partName}' tillagd.`);
      } catch (error) {
        console.error('Kunde inte lägga till flygplansdel:', error);
      }
    } else {
      console.error('Användaren är inte autentiserad eller data saknas.');
    }
  }

  // Hämta flygplan från Firestore
  async fetchFavoritePlanes() {
    if (this.isAuthenticated) {
      try {
        const planes = await this.firestoreService.getCollectionData('favoritePlanes');
        this.planes = planes.map((plane: any) => ({
          id: plane.id,
          name: plane.name,
        }));
      } catch (error) {
        console.error('Kunde inte hämta flygplan:', error);
      }
    }
  }
}
