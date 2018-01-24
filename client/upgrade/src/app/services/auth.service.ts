import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';

export interface Credentials {
  username: string,
  password: string
}

@Injectable()
export class AuthService {
  observer: Observer<any>
  baseUrl: string;
  constructor(private http: HttpClient) { }

  create = (createReq: any) => {
    this.http.post<any>('api/createAccount', createReq)
      .map(res => res)
      .subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(data))
        this.observer.next(true);
      },
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
    return new Promise((resolve, reject) => {
      this.http.post<any>('api/login', credentials)
        .map(res => res)
        .subscribe(
        data => {
          localStorage.setItem('user', JSON.stringify(data))
          resolve(true);
          this.observer.next(true);
        },
        error => {
          console.log(error);
          // TODO : prettier alerts
          if (error.status === 401) {
            alert('Invalid username or password');
          }
          reject(false);
        });
    });
  }

  logout = () => {
    localStorage.removeItem('user');
    this.observer.next(false);
  }

  getAuthStatus = () => {
    return this.createObservable();
  }

  createObservable(): Observable<boolean> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }
}
