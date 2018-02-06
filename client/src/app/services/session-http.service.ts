import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Promise } from 'q';
import { SessionMetadata } from '../../shared/interfaces';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SessionHttpService {
  private baseUrl: string = 'http://localhost'
  constructor(private http: HttpClient) { }

  getSessionById = (id: string) => {
    return this.http.get(`/api/sessions/${id}`).map(res => res);
  }

  getSessionMetadataById = (id: string): Observable<SessionMetadata> => {
    return this.http.get<SessionMetadata>(`/api/sessions/${id}/meta`);
  }

  getManySessionsByOwnerUid = (id: string): Observable<SessionMetadata[]> => {
    return this.http.get<SessionMetadata[]>(`/api/sessions/many/${id}`);
  }

  createSession = (session: SessionMetadata) => {
    return this.http.post<any>('/api/sessions', session);
  }

  removeSession = (id: string) => {
    return this.http.delete<any>(`/api/sessions/${id}`)
  }
}
