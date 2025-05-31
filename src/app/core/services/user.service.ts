// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { FIREBASE_FIRESTORE } from '../../frebase.config';
import { AppUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private firestore: Firestore = FIREBASE_FIRESTORE;
  private usersCollection = collection(this.firestore, 'users'); // Coleção 'users'

  constructor() {}

  // Salva ou atualiza dados do usuário no Firestore
  // O uid é o ID do Firebase Authentication
  // O 'codigoUsuario' é o que você pediu para o formulário
  async saveUserProfile(
    uid: string,
    codigoUsuario: string,
    nomeCompleto: string,
    email: string
  ): Promise<void> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const userData: AppUser = {
      uid,
      codigoUsuario,
      nomeCompleto,
      email,
    };
    try {
      await setDoc(userRef, userData, { merge: true }); // merge: true para não sobrescrever outros campos se existirem
      console.log('User profile saved/updated in Firestore for UID:', uid);
    } catch (error) {
      console.error('Error saving user profile to Firestore:', error);
      throw error;
    }
  }

  async getUserProfile(uid: string): Promise<AppUser | null> {
    const userRef = doc(this.firestore, `users/${uid}`);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data() as AppUser;
    } else {
      console.log('No such user profile in Firestore!');
      return null;
    }
  }

  // TODO: Adicionar métodos para listar, atualizar e deletar usuários se necessário
}
export type { AppUser };
