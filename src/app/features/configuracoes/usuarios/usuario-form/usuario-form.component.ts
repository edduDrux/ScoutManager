// src/app/features/configuracoes/usuarios/usuario-form/usuario-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Para notificações
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // RouterModule para routerLink
import { AuthService } from '../../../../core/services/auth.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css'],
})
export class UsuarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  @Input() id?: string; // Para edição, vindo da rota :id

  usuarioForm = this.fb.group({
    codigoUsuario: ['', Validators.required],
    nomeCompleto: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]], // Email para o Firebase Auth
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });
  isLoading = false;
  isEditMode = false;
  pageTitle = 'Cadastrar Novo Usuário';

  ngOnInit(): void {
    if (this.id) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Usuário';
      this.usuarioForm.get('senha')?.clearValidators(); // Senha não é obrigatória na edição
      this.usuarioForm.get('senha')?.updateValueAndValidity();
      this.loadUserData(this.id);
    }
  }

  async loadUserData(uid: string): Promise<void> {
    this.isLoading = true;
    try {
      const userProfile = await this.userService.getUserProfile(uid);
      if (userProfile) {
        this.usuarioForm.patchValue({
          codigoUsuario: userProfile.codigoUsuario,
          nomeCompleto: userProfile.nomeCompleto,
          email: userProfile.email,
          // Não carregamos a senha
        });
      } else {
        this.snackBar.open('Usuário não encontrado.', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/configuracoes/usuarios']);
      }
    } catch (error) {
      this.snackBar.open('Erro ao carregar dados do usuário.', 'Fechar', {
        duration: 3000,
      });
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async onSubmit(): Promise<void> {
    if (this.usuarioForm.invalid) {
      this.snackBar.open(
        'Por favor, preencha todos os campos corretamente.',
        'Fechar',
        { duration: 3000 }
      );
      return;
    }
    this.isLoading = true;
    const { codigoUsuario, nomeCompleto, email, senha } =
      this.usuarioForm.value;

    try {
      if (this.isEditMode && this.id) {
        // Atualizar dados no Firestore. A senha do Firebase Auth não é atualizada aqui.
        // Para atualizar senha, precisaria de uma função separada (e o usuário logado, ou admin SDK).
        await this.userService.saveUserProfile(
          this.id,
          codigoUsuario!,
          nomeCompleto!,
          email!
        );
        this.snackBar.open('Usuário atualizado com sucesso!', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/configuracoes/usuarios']);
      } else {
        // Criar novo usuário
        // 1. Criar no Firebase Auth
        const firebaseUser = await this.authService.registerUser(
          email!,
          senha!
        );
        if (firebaseUser) {
          // 2. Salvar dados adicionais no Firestore
          await this.userService.saveUserProfile(
            firebaseUser.uid,
            codigoUsuario!,
            nomeCompleto!,
            email!
          );
          this.snackBar.open('Usuário cadastrado com sucesso!', 'Fechar', {
            duration: 3000,
          });
          this.router.navigate(['/configuracoes/usuarios']);
        } else {
          this.snackBar.open(
            'Erro ao criar usuário na autenticação.',
            'Fechar',
            { duration: 3000 }
          );
        }
      }
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'Ocorreu um erro.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Este e-mail já está em uso.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
      }
      this.snackBar.open(errorMessage, 'Fechar', { duration: 5000 });
    } finally {
      this.isLoading = false;
    }
  }
}
