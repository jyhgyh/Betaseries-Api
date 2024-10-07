import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
  standalone: true,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        console.log('Login successful', response);
        // Stocke le token si ce n'est pas déjà fait
        localStorage.setItem('access_token', response.token);
        // Rediriger vers la page du profil
        this.router.navigate(['/profile']);
      },
      error => {
        console.error('Login failed', error);
        if (error.error && error.error.errors) {
          console.error('API error:', error.error.errors);
        }
      }
    );
  }


}
