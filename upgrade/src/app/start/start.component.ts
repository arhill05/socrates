import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
  user: any;
  sessionId: string = "";
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAuth();
  }

  onStartClick = async () => {
    if (!this.user) {
      try {
        this.user = await this.afAuth
          .auth
          .signInAnonymously();
      } catch (err) {
        alert('ERROR! : ' + err.message);
      }
    }

    this.goToSession();
  }

  goToSession = async () => {
    if (!this.sessionId || !this.sessionId.length) {
      alert('Please enter a valid session ID!');
    }

    // get session by entered session id
    this.db.object(`sessions/${this.sessionId}`)
      .snapshotChanges()
      .subscribe(session => {
        if (session.key !== null) { // if exists
          this.router.navigateByUrl(`questions/${this.sessionId}`);
        } else {
          alert('not found!');
        }
      });
  }

  signOut = () => {
    this.afAuth.auth.signOut();
  }

  onLoginClick = () => {
    console.log('login');
  }

  onAccountClick = () => {
    console.log('account');
  }

  getUsers = () => {
    console.log('users');
  }

  getAuth = () => {
    console.log('getting auth');
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      console.log(this.user);
    })
  }

  onMobileAccountClick = () => {
    console.log('mobileAcc');
  }
}
