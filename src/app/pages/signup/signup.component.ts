import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { AuthService } from 'app/services/auth/auth.service';
import { NotificationService } from 'app/services/notification.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signUpForm: FormGroup;
  isSubmitting: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.signUpForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(form: FormGroup) {
    return form.controls['password'].value ===
      form.controls['confirmPassword'].value
      ? null
      : { mismatch: true };
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  signUp(): void {
    if (this.signUpForm.valid) {
      this.isSubmitting = true;
      const { email, password, name } = this.signUpForm.value;
      this.authService.signup(name, email, password).subscribe(
        (response) => {
          this.notificationService.show('Signup successful!', 'success');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.isSubmitting = false;
          this.notificationService.show(
            'Signup failed, Please try again',
            'error'
          );
          console.error(error);
        }
      );
    } else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
