import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SessionMetadata } from '../../shared/interfaces';
import { SessionHttpService } from '../services/session-http.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: any;
  ownedSessions: any[] = [];
  addingSession: boolean = false;
  constructor(private auth: AuthService, private sessionHttp: SessionHttpService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    if (this.user) {
      this.sessionHttp.getManySessionsByOwnerUid(this.user.id)
        .subscribe((sessions) => {
          sessions.forEach(session => this.ownedSessions.push(session));
          console.log(this.ownedSessions)
        });
    }
  }

  createSession = (session: SessionMetadata) => {
    session.ownerUid = this.user.id;
    this.sessionHttp.createSession(session)
      .subscribe(
      res => this.ownedSessions.push(res),
      err => alert(err.error.message) // TODO : prettier alerts
      );
    this.addingSession = false;
  }

  goToSession = (id: string) => {
    console.log(id);
  }

}
