import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterModel, LoginModel } from './model';

@Component({
  selector: 'app-login-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {
  activeForm: 'login' | 'register' = 'login';

  registerObj: RegisterModel = new RegisterModel();
  loginObj: LoginModel = new LoginModel();

  constructor(private _snackbar: MatSnackBar, private _router: Router) {}

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
    this.clearForms();
  }

  clearForms() {
    this.registerObj = new RegisterModel();
    this.loginObj = new LoginModel();
  }

  registerForm() {
    const { firstName, lastName, email, password } = this.registerObj;

    if (!firstName || !lastName || !email || !password) {
      this._snackbar.open('Please fill all fields in registration', 'Close', { duration: 3000 });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this._snackbar.open('Please enter a valid email', 'Close', { duration: 3000 });
      return;
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      this._snackbar.open(
        'Password must be 8+ characters with special character and number',
        'Close',
        { duration: 4000 }
      );
      return;
    }

    const localUsers = localStorage.getItem('users');
    let users: RegisterModel[] = localUsers ? JSON.parse(localUsers) : [];

    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
      this._snackbar.open('Email is already registered', 'Close', { duration: 3000 });
      return;
    }

    users.push(this.registerObj);
    localStorage.setItem('users', JSON.stringify(users));
    this._snackbar.open('User registered successfully. Please login.', 'Close', { duration: 3000 });

    this.toggleForm('login');
  }

  loginForm() {
    if (!this.loginObj.email || !this.loginObj.password) {
      this._snackbar.open('Please enter email and password', 'Close', { duration: 3000 });
      return;
    }

    const localUsers = localStorage.getItem('users');
    if (!localUsers) {
      this._snackbar.open('No registered users found. Please register first.', 'Close', { duration: 3000 });
      return;
    }

    const users: RegisterModel[] = JSON.parse(localUsers);
    const foundUser = users.find(user =>
      user.email.toLowerCase() === this.loginObj.email.toLowerCase()
    );

    if (!foundUser) {
      this._snackbar.open('User does not exist. Please register first.', 'Close', { duration: 3000 });
      return;
    }

    if (foundUser.password !== this.loginObj.password) {
      this._snackbar.open('Incorrect password.', 'Close', { duration: 3000 });
      return;
    }

    localStorage.setItem('loggedUser', JSON.stringify(foundUser));
    this._snackbar.open('Login successful', 'Close', { duration: 3000 });
    this._router.navigateByUrl('/dashboard');
  }
}
