import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promise } from 'q';

@Injectable()
export class SessionHttpService {
  private baseUrl: string = 'http://localhost'
  constructor(private http: HttpClient) { }

  getSessionById = (id: string) => {
    return this.http.get(`/api/sessions/${id}`).map(res => res);
  }

  getSessionMetadataById = (id: string) => {
    return this.http.get(`/api/sessions/${id}/meta`).map(res => res);
  }

  createSession = (session: any) => {
    return this.http.post('/api/sessions', session).map(res => res);
  }
}
