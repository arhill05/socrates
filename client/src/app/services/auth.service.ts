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
  authObserver: Observer<any>
  activeSessionObserver: Observer<any>
  activeSessionId: string;
  baseUrl: string;
  constructor(private http: HttpClient) {
  }

  create = (createReq: any) => {
    this.http.post<any>('api/createAccount', createReq)
      .subscribe(
      data => {
        localStorage.setItem('user', JSON.stringify(data))
        this.authObserver.next(true);
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
        .subscribe(
        data => {
          localStorage.setItem('user', JSON.stringify(data))
          resolve(true);
          this.authObserver.next(true);
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
    this.authObserver.next(false);
  }

  getAuthStatus = () => {
    return this.createAuthObservable();
  }

  createAuthObservable(): Observable<boolean> {
    return new Observable(observer => {
      this.authObserver = observer;
    });
  }

  getActiveSession = () => {
    return this.activeSessionId;
  }

  getActiveSessionSubscription = (): Observable<string> => {
    return new Observable(observer => {
      this.activeSessionObserver = observer;
    })
  }

  setActiveSession = (id: string) => {
    this.activeSessionId = id;
    this.activeSessionObserver.next(id);
  }
}
