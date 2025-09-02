import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  showLogin = true; 
  alertMessage = '';
  alertType: 'success' | 'error' | '' = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  toggleForm() {
    this.showLogin = !this.showLogin;
    this.alertMessage = '';
    this.alertType = '';
  }

  login() {
  if (this.loginForm.invalid) return;
  const request = this.loginForm.value;
  this.auth.login(request).subscribe({
    next: () => {
      this.showAlert('Login successful!', 'success');
      this.router.navigate(['/home']);
    },
    error: () => this.showAlert('Invalid credentials', 'error')
  });
}
  register() {
  if (this.registerForm.invalid) return;
  console.log("button pressed");
  const request = this.registerForm.value;
  this.auth.register(request).subscribe({
    next: () => this.showAlert('Registration successful! Please login.', 'success'),
    error: () => this.showAlert('Registration failed', 'error')
  });
}

  private showAlert(message: string, type: 'success' | 'error') {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 3000);
  }
}
