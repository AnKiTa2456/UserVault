import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const loggedUser = localStorage.getItem('loggedUser');
    if (!loggedUser) {
      this.router.navigate(['/loginsignup']); 
      return;
    }
    this.user = JSON.parse(loggedUser);
  }

  onLogout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/loginsignup']); // Redirect to login
  }
}
