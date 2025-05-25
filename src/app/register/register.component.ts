import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email!: string;
  password!: string;
  name!: string;
  role!: string;
  code!: string;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService
      .register(this.email, this.password, this.name, this.role, this.code)
      .then(() => this.router.navigate(['/home']))
      .catch((error) => console.error('Erro de registro:', error));
  }
}
