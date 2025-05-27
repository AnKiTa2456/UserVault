import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterModel } from '../login-singup/model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user: RegisterModel = new RegisterModel();

  constructor(private _snackbar: MatSnackBar, private _router: Router) {}

  onRegister() {
    // Trim inputs to avoid space-only inputs
    if (
      !this.user.firstName?.trim() ||
      !this.user.lastName?.trim() ||
      !this.user.email?.trim() ||
      !this.user.password?.trim()
    ) {
      this._snackbar.open('Please fill all fields', 'Close', { duration: 3000 });
      return;
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.user.email)) {
      this._snackbar.open('Please enter a valid email', 'Close', { duration: 3000 });
      return;
    }

    // Password validation: at least 8 chars, at least one special character
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(this.user.password)) {
      this._snackbar.open(
        'Password must be at least 8 characters and contain at least one special character',
        'Close',
        { duration: 4000 }
      );
      return;
    }

    // Get existing users from localStorage
    const localUsers = localStorage.getItem('users');
    let users: RegisterModel[] = localUsers ? JSON.parse(localUsers) : [];

    // Check for unique email
    const emailExists = users.some(
      u => u.email.toLowerCase() === this.user.email.toLowerCase()
    );
    if (emailExists) {
      this._snackbar.open('Email is already registered', 'Close', { duration: 3000 });
      return;
    }

    // Add new user and save
    users.push(this.user);
    localStorage.setItem('users', JSON.stringify(users));

    this._snackbar.open('Registration successful! Please login.', 'Close', { duration: 3000 });

    // Redirect to login page (adjust path if needed)
    this._router.navigateByUrl('/login-signup');
  }
}
