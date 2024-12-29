import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, updateDoc, addDoc, doc, deleteDoc } from 'firebase/firestore';
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

  // Uppdaterar ett dokument i en specifik samling
  async updateDocument(collectionName: string, documentId: string, updatedData: any): Promise<void> {
    try {
      const docRef = doc(this.db, `${collectionName}/${documentId}`);
      await updateDoc(docRef, updatedData);
      console.log('Dokument uppdaterat:', documentId);
    } catch (error) {
      console.error('Fel vid uppdatering av dokument:', error);
      throw error;
    }
  }

  // Raderar ett dokument från en specifik samling
  async deleteDocument(collectionName: string, documentId: string): Promise<void> {
    try {
      const docRef = doc(this.db, `${collectionName}/${documentId}`);
      await deleteDoc(docRef);
      console.log('Dokument raderat:', documentId);
    } catch (error) {
      console.error('Fel vid radering av dokument:', error);
      throw error;
    }
  }
}
