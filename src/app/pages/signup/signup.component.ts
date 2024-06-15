import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterOutlet, RouterModule],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}
}
