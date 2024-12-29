import { Component, OnInit} from '@angular/core';
import { FirestoreService } from '../../core/firestore.services';
import { auth } from '../../core/firebase.config';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  username: string = '';
  allFavoritePlanes: { name: string; description: string; addedAt: Date }[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    // Hämta användarens e-post och sätt username
    auth.onAuthStateChanged((user) => {
      if (user && user.email) {
        // Kontrollera att e-post inte är null
        this.username = user.email.split('@')[0]; // Ta första delen av e-posten
        this.fetchFavoritePlanes(); // Hämta användarens favoritflygplan
      } else {
        console.error('Användarens e-postadress är null eller odefinierad.');
      }
    });
  }

  //Hämta alla favoritflygplan
  async fetchFavoritePlanes() {
    try {
      const planes = await this.firestoreService.getCollectionData('favoritePlanes');
      this.allFavoritePlanes = planes.map((plane: any) => {
        return {
          name: plane.name,
          description: plane.description,
          addedAt: plane.addedAt.toDate(),
        };
      });
    } catch (error) {
      console.error('Kunde inte hämta favoritflygplan:', error);
    }
  }
}