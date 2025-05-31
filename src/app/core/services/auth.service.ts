// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Auth,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword, // Para cadastro de usuários
  signOut,
} from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { FIREBASE_AUTH } from '../../frebase.config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = FIREBASE_AUTH;
  private currentUserSubject = new BehaviorSubject<FirebaseUser | null>(null);
  public currentUser$: Observable<FirebaseUser | null> =
    this.currentUserSubject.asObservable();
  public isAuthenticated$: Observable<boolean>;

  constructor(private router: Router) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
      if (user) {
        // Opcional: verificar se é o ADM-SIS e se o grupo já foi "selecionado"
        // ou se é um usuário de um grupo específico.
        // Para o ADM-SIS, o login com 'thor102030' já te dá acesso global inicial.
      }
    });

    this.isAuthenticated$ = new Observable((observer) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          observer.next(!!user);
        },
        (err) => observer.error(err),
        () => observer.complete()
      );
    });
  }

  async login(email: string, pass: string): Promise<FirebaseUser | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        pass
      );
      this.currentUserSubject.next(userCredential.user);
      // Lógica para ADM-SIS (se necessário diferenciar aqui)
      // Se for 'adm-sis@scoutcalendar.com' (exemplo), redirecionar para home
      // Senão, talvez carregar dados do grupo do usuário, etc.
      // Por enquanto, apenas login genérico.
      if (userCredential.user.email === 'ADM-SIS' && pass === 'thor102030') {
        // Você pode usar um e-mail mais formal como adm@scoutcalendar.com para o ADM-SIS
        // e o 'Código do usuário' que você mencionou para outros usuários como e-mail
        console.log('ADM-SIS Logged in');
      }
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      return null;
    }
  }

  // Para o cadastro de usuários em Configurações > Usuários
  async registerUser(
    email: string,
    pass: string
  ): Promise<FirebaseUser | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        pass
      );
      // Não vamos logar o usuário recém-criado automaticamente aqui.
      // Apenas criamos a conta no Firebase Auth.
      // Dados adicionais (Nome completo, Código do usuário) serão salvos no Firestore.
      return userCredential.user;
    } catch (error) {
      console.error('User registration error:', error);
      throw error; // Propagar o erro para o componente tratar
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  getCurrentUser(): FirebaseUser | null {
    return this.currentUserSubject.value;
  }
}
