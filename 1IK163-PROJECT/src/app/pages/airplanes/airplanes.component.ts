import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../core/firestore.services';
import { AuthService } from '../../core/auth.service';
import { auth } from '../../core/firebase.config';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-airplanes',
  imports: [FormsModule, CommonModule],
  templateUrl: './airplanes.component.html',
  styleUrls: ['./airplanes.component.css'],
})
export class AirplanesComponent implements OnInit {
  favoritePlane: string = '';
  description: string = '';
  planes: { id: string; name: string; description: string }[] = [];
  isAuthenticated: boolean = false;
  isEditing: boolean = false;
  editingPlaneId: string | null = null;
  errorMessage: string = ''; // För att visa felmeddelanden

  constructor(
    private firestoreService: FirestoreService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        this.isAuthenticated = true;
        console.log('Användaren är autentiserad:', user.email);
        this.fetchFavoritePlanes();
      } else {
        this.isAuthenticated = false;
        console.error('Användaren är inte autentiserad.');
      }
    });
  }

  // Lägg till ett nytt favoritflygplan
  async addFavoritePlane() {
    if (this.favoritePlane.trim() && this.description.trim()) {
      this.errorMessage = ''; // Återställ tidigare felmeddelande
      if (this.isAuthenticated) {
        try {
          const planeData = {
            name: this.favoritePlane,
            description: this.description,
            addedAt: new Date(),
          };

          const documentId = await this.firestoreService.addDocument('favoritePlanes', planeData);
          this.planes.push({ id: documentId, name: this.favoritePlane, description: this.description });

          // Återställ fälten
          this.favoritePlane = '';
          this.description = '';
        } catch (error) {
          console.error('Kunde inte lägga till flygplan:', error);
        }
      }
    } else {
      this.errorMessage = 'Alla fält måste fyllas i.';
    }
  }

  // Starta redigering av ett flygplan
  startEditing(plane: { id: string; name: string; description: string }) {
    this.isEditing = true;
    this.editingPlaneId = plane.id;
    this.favoritePlane = plane.name;
    this.description = plane.description;
  }

  // Uppdatera ett favoritflygplan
  async updateFavoritePlane() {
    if (this.favoritePlane.trim() && this.description.trim()) {
      this.errorMessage = ''; // Återställ tidigare felmeddelande
      if (this.isAuthenticated && this.editingPlaneId) {
        try {
          const updatedData = {
            name: this.favoritePlane,
            description: this.description,
          };

          await this.firestoreService.updateDocument('favoritePlanes', this.editingPlaneId, updatedData);

          const index = this.planes.findIndex((plane) => plane.id === this.editingPlaneId);
          if (index > -1) {
            this.planes[index].name = this.favoritePlane;
            this.planes[index].description = this.description;
          }

          this.cancelEditing();
        } catch (error) {
          console.error('Kunde inte uppdatera flygplan:', error);
        }
      }
    } else {
      this.errorMessage = 'Alla fält måste fyllas i.';
    }
  }

  // Avbryt redigering
  cancelEditing() {
    this.isEditing = false;
    this.editingPlaneId = null;
    this.favoritePlane = '';
    this.description = '';
    this.errorMessage = ''; // Återställ felmeddelandet
  }

  // Radera ett flygplan
  async deletePlane(planeId: string) {
    if (this.isAuthenticated) {
      try {
        await this.firestoreService.deleteDocument('favoritePlanes', planeId);
        this.planes = this.planes.filter((plane) => plane.id !== planeId);
        console.log('Flygplan raderat:', planeId);
      } catch (error) {
        console.error('Kunde inte radera flygplan:', error);
      }
    }
  }

  // Hämta favoritflygplan från Firestore
  async fetchFavoritePlanes() {
    if (this.isAuthenticated) {
      try {
        const planes = await this.firestoreService.getCollectionData('favoritePlanes');
        this.planes = planes.map((plane: any) => ({
          id: plane.id,
          name: plane.name,
          description: plane.description,
        }));
      } catch (error) {
        console.error('Kunde inte hämta flygplan:', error);
      }
    }
  }
}
