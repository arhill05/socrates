import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLoggedIn: boolean;
  activeSessionId: string;
  constructor(private router: Router,
  private auth: AuthService) {
  }
  ngOnInit() {
    this.isLoggedIn = this.auth.getUser() !== null;
    this.auth.getAuthStatus().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.auth.getActiveSessionSubscription().subscribe(sessionId => {
      this.activeSessionId = sessionId;
    })
  }
}
