import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Credentials {
  username: string,
  password: string
}

@Injectable()
export class AuthService {

  baseUrl: string;
  constructor(private http: HttpClient) { }

  create = (createReq: any) => {
    this.http.post<any>('api/createAccount', createReq)
      .map(res => res)
      .subscribe(
      data => localStorage.setItem('user', JSON.stringify(data)),
      error => {
        // TODO : prettier alerts
        console.log(error);
        alert(error.error.message)
      }
      );
  }

  getUser = () => {
    return JSON.parse(localStorage.getItem('user'));
  }

  login = (credentials: any) => {
    this.http.post<any>('api/login', credentials)
      .map(res => res)
      .subscribe(
      data => localStorage.setItem('user', JSON.stringify(data)),
      error => {
        console.log(error);
        // TODO : prettier alerts
        if (error.status === 401) {
          alert('Invalid username or password');
        }
      }
      );
  }

  logout = () => {
    localStorage.removeItem('user');
  }
}
