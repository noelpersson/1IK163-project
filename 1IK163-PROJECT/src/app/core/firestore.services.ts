import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, doc, setDoc } from 'firebase/firestore';
import { firebaseApp } from './firebase.config';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private db = getFirestore(firebaseApp);

  constructor() {}

  // Hämtar data från en specifik samling
  async getCollectionData(collectionName: string) {
    try {
      const colRef = collection(this.db, collectionName);
      const colSnapshot = await getDocs(colRef);
      return colSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Fel vid hämtning av samling:', error);
      throw error;
    }
  }

  // Lägger till ett dokument i en specifik samling
  async addDocument(collectionName: string, data: any) {
    try {
      const colRef = collection(this.db, collectionName);
      const docRef = await addDoc(colRef, data);
      console.log('Dokument tillagt med ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Fel vid tillägg av dokument:', error);
      throw error;
    }
  }

  // Lägger till delar kopplade till ett specifikt flygplan
  async addPlanePart(planeId: string, partData: any) {
    try {
      const partRef = doc(this.db, `favoritePlanes/${planeId}/parts/${partData.partName}`);
      await setDoc(partRef, partData);
      console.log(`Del '${partData.partName}' tillagd till flygplan ${planeId}`);
    } catch (error) {
      console.error('Fel vid tillägg av flygplansdel:', error);
      throw error;
    }
  }
}
