import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}
}
