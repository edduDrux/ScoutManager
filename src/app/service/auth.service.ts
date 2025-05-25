import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn$: Observable<boolean>;
  onAuthStateChanged: any;
  constructor(
    private afAuth: AngularFireAuth,
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.isLoggedIn$ = this.afAuth.authState.pipe(map((user) => !!user));
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(
    email: string,
    password: string,
    name: string,
    role: string,
    code: string
  ) {
    return createUserWithEmailAndPassword(this.auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        return this.saveUserData(user.uid, name, role, code);
      }
    );
  }

  private async saveUserData(
    uid: string,
    name: string,
    role: string,
    code: string
  ) {
    const userDoc = doc(this.firestore, 'users', uid);
    await setDoc(userDoc, {
      name,
      role,
      code,
    });
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async getUserData(uid: string) {
    const userDoc = doc(this.firestore, 'users', uid);
    const docSnap = await getDoc(userDoc);
    return docSnap.exists() ? docSnap.data() : null;
  }

  async isAdmin(): Promise<boolean> {
    const user = this.getCurrentUser();
    if (user) {
      const userData = await this.getUserData(user.uid);
      return userData?.['role'] === 'admin';
    }
    return false;
  }
}
