import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isSubmitTing: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.isSubmitTing = true;
    this.authService.login(this.email, this.password).subscribe(
      (response) => {
        if (response.access_token) {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        this.isSubmitTing = false;
        console.error(error);
        alert('Login failed');
      }
    );
  }
}
