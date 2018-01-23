import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { create } from 'domain';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

  }

  login = (credentials: any) => {
    console.log(credentials);
    this.auth.login(credentials);
    this.router.navigateByUrl('/account');
  }

  createAccount = (formData: any) => {
    console.log(formData);
    if (this.isValid(formData)) {
      this.auth.create(formData);
      this.router.navigateByUrl('/account');
    }
  }

  logout = () => {
    this.auth.logout();
  }

  isValid = (formData: any): boolean => {
    const password = (<HTMLFormElement>document.getElementById('password'));
    const confirmPassword = (<HTMLFormElement>document.getElementById('confirmPassword'));
    if (password.value !== confirmPassword.value) {
      confirmPassword.setCustomValidity('Passwords must match!');
      confirmPassword.reportValidity();
      return false;
    } else {
      confirmPassword.setCustomValidity('');
      confirmPassword.reportValidity();
      return true;
    }
  }
}
