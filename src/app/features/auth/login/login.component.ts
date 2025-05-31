// src/app/features/auth/login/login.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'; // Import FormsModule também
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule, // Adicionado
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Para o ADM-SIS, podemos preencher ou usar diretamente.
  // Para o exemplo, vamos usar um formulário.
  // O 'Código do usuário' que você mencionou para outros usuários pode ser o 'email' aqui.
  loginForm = this.fb.group({
    // Se o ADM-SIS usa "ADM-SIS" como login e não um email:
    // precisaremos de uma lógica para tratar isso ou usar um email fixo para ele.
    // Por simplicidade, vamos assumir que "ADM-SIS" é o email e "thor102030" a senha.
    // Se quiser manter 'Código do Usuário' como algo separado do email de login,
    // o Firebase Auth ainda precisará de um email para a conta.
    // Você pode usar o 'Código do Usuário' + '@seudominio.com' como email.
    email: ['ADM-SIS', [Validators.required]], // Ou um email como 'adm-sis@scoutcalendar.com'
    password: ['thor102030', [Validators.required]],
  });
  isLoading = false;
  loginError: string | null = null;

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.loginError = null;
    const { email, password } = this.loginForm.value;

    try {
      // O ADM-SIS ID é 'ADM-SIS' e senha 'thor102030'
      // Para o Firebase Auth, 'ADM-SIS' não é um email válido.
      // Solução: Crie no Firebase Authentication um usuário com email ex: 'adm.sis@scoutcalendar.com' e senha 'thor102030'
      // No formulário de login, se o usuário digitar 'ADM-SIS', você substitui por 'adm.sis@scoutcalendar.com' antes de enviar ao Firebase.
      // Ou, peça para o ADM-SIS logar com este email completo.

      let loginEmail = email!;
      // Se você quer que o ADM-SIS digite 'ADM-SIS' no campo de email:
      if (email === 'ADM-SIS') {
        loginEmail = 'adm.sis@scoutcalendar.com'; // CRIE ESTE USUÁRIO NO FIREBASE AUTH MANUALMENTE
      }
      // Para outros usuários, o 'Código do usuário' pode ser o username parte do email.
      // Ex: codigo 'chefejoao' -> email 'chefejoao@scoutcalendar.com'

      const user = await this.authService.login(loginEmail, password!);
      if (user) {
        // Verificar se há uma URL de retorno (após ser redirecionado pelo AuthGuard)
        const returnUrl =
          this.router.routerState.snapshot.root.queryParams['returnUrl'] ||
          '/home';
        this.router.navigateByUrl(returnUrl);
      } else {
        this.loginError = 'Falha no login. Verifique suas credenciais.';
      }
    } catch (error: any) {
      console.error(error);
      this.loginError = error.message || 'Ocorreu um erro desconhecido.';
    } finally {
      this.isLoading = false;
    }
  }
}
