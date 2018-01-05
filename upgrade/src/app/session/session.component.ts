import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  sessionId: any;
  sessionRef: any;
  user: any;
  questionsRef: any;
  upvotedQuestionsRef: any;
  upvotedQuestions: any[] = [];

  constructor(private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.getSessionAndQuestions();
  }

  getSessionAndQuestions = async () => {
    this.sessionId = this.route.snapshot.params.sessionId;
    this.sessionRef = this.db
      .object(`sessions/${this.sessionId}`)
      .valueChanges();

    this.questionsRef = this.db
      .list(`sessions_questions/${this.sessionId}`)
      .valueChanges();

    const user = await this.afAuth.authState.toPromise().then(currentUser => { return currentUser })
    console.log(user);
    this.upvotedQuestionsRef = this.db
      .list(`users_questions/${user}`);

    this.upvotedQuestions = this.upvotedQuestionsRef.valueChanges().map(changes => {
      return changes;
    })
  }

  userIsAdmin = () => {
    return false;
  }

  clearQuestions = () => {
    return null;
  }

  upvoteQuestion = () => {
    return null;
  }

  addQuestion = () => {
    return null;
  }

  remove = () => {
    return null;
  }

  edit = () => {
    return null;
  }

  onHomeClick = () => {
    return null;
  }

  onLoginClick = () => {
    return null;
  }

  onAccountClick = () => {
    return null;
  }

  userHasUpvoted = () => {
    return false;
  }
}
