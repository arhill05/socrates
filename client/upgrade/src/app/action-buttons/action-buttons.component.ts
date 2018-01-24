import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.scss']
})
export class ActionButtonsComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.getUser() !== null;
    this.auth.getAuthStatus().subscribe(isLoggedIn => this.isLoggedIn = isLoggedIn);
  }

  onHomeClick = (): void => {
    this.router.navigateByUrl('/');
  }

  onAccountClick = (): void => {
    this.router.navigateByUrl('/user/account');
  }

  onLogoutClick = (): void => {
    this.auth.logout();
    if(this.router.url === '/user/account') {
      this.router.navigateByUrl('/');
    }
  }

  onLoginClick = (): void => {
    this.router.navigateByUrl('/user/login');
  }

}
