import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { SessionHttpService } from '../services/session-http.service';
import { QuestionWsService } from '../services/question-ws.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  sessionId: any;
  sessionRef: any;
  session: any;
  user: any;
  questions: any[] = [];
  upvotedQuestions: any[] = [];

  constructor(private sessionHttpService: SessionHttpService,
    private questionsService: QuestionWsService,
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase) { }

  ngOnInit() {
    this.getSessionAndQuestions();
  }

  getSessionAndQuestions = async () => {
    this.sessionId = this.route.snapshot.params.sessionId;
    this.sessionHttpService.getSessionMetadataById(this.sessionId).subscribe(session => {
      this.session = session;
    });
    this.questionsService.getQuestions(this.sessionId).subscribe(questions => {
      this.questions = questions;
    });

    this.sessionRef = this.db
      .object(`sessions/${this.sessionId}`)
      .valueChanges();

    const user = await this.afAuth.authState.toPromise().then(currentUser => { return currentUser })
  }

  userIsAdmin = () => {
    return false;
  }

  clearQuestions = () => {
    return null;
  }

  upvoteQuestion = (question: any) => {
    const questionIndex = this.upvotedQuestions.indexOf(question._id);
    if (questionIndex >= 0) {
      question.upvotes--;
      this.upvotedQuestions.splice(questionIndex, 1);
    } else {
      question.upvotes++;
      this.upvotedQuestions.push(question._id);
    }
    const questionReq = {
      sessionId: this.sessionId,
      question
    };
    this.questionsService.sendQuestion(questionReq);
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
