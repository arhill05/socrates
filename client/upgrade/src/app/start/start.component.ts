import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AuthService } from '../services/auth.service';
import { SessionHttpService } from '../services/session-http.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  isLoggedIn: boolean;
  sessionId: string = "";
  constructor(
    private auth: AuthService,
    private router: Router,
    private sessionHttp: SessionHttpService
  ) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.getUser() !== null;
    this.getAuth();
  }

  onStartClick = async () => {
    this.sessionHttp.getSessionMetadataById(this.sessionId).toPromise().then(session => {
      if (session !== null) {
        this.router.navigateByUrl(`/questions/${this.sessionId}`);
      } else {
        alert('That session doesn\'t exist'); // TODO : prettier alertsl
      }
    });
  }

  getUsers = () => {
    console.log('users');
  }

  getAuth = () => {
    this.auth.getAuthStatus().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  onMobileAccountClick = () => {
    if (this.isLoggedIn) {
      this.router.navigateByUrl('/user/account');
    } else {
      this.router.navigateByUrl('/user/login');
    }
  }
}
