import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from 'app/services/auth/auth.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        (response) => {
          if (response.access_token) {
            this.router.navigate(['/home']);
          }
        },
        (error) => {
          this.isSubmitting = false;
          this.notificationService.show(
            'Login failed. Please check your credentials and try again.',
            'error'
          );
        }
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
