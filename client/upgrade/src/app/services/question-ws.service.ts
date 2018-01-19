import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { map, catchError } from 'rxjs/operators';
import * as socketIo from 'socket.io-client';
import { Socket } from '../../shared/interfaces';

declare var io: {
  connect(url: string): Socket;
}

@Injectable()
export class QuestionWsService {
  socket: Socket
  observer: Observer<any>

  constructor() { }

  getQuestions(sessionId: string): Observable<any> {
    console.log(sessionId);
    this.socket = socketIo('http://localhost:3000', { path: '/ws' });


    this.socket.on('connect', () => { this.socket.emit('join session', sessionId) })


    this.socket.on('questionsUpdated', res => {
      this.observer.next(res);
    });

    return this.createObservable();
  }

  sendQuestion = (questionReq: any): void => {
    this.socket.emit('updateQuestion', questionReq);
  }

  createQuestion = (questionReq: any): void => {
    this.socket.emit('createQuestion', questionReq);
  }

  createObservable(): Observable<string> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }
}
