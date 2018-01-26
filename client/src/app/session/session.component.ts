import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { SessionHttpService } from '../services/session-http.service';
import { QuestionWsService } from '../services/question-ws.service';
import { SessionMetadata, Question, QuestionRequest } from '../../shared/interfaces';
import { OnDestroy, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, AfterViewInit {
  confirmClear: boolean = false;
  sessionId: string;
  session: SessionMetadata;
  user: any;
  userIsAdmin: boolean;
  questions: Question[] = [];
  upvotedQuestions: string[] = [];
  showLoading: boolean;
  newQuestion: Question = {
    questionText: null,
    upvotes: 0,
    sessionId: this.sessionId
  };

  constructor(private sessionHttpService: SessionHttpService,
    private questionsService: QuestionWsService,
    private route: ActivatedRoute,
    private auth: AuthService) { }

  ngOnInit() {
    this.getSessionAndQuestions();
  }

  ngAfterViewInit() {
    this.auth.setActiveSession(this.sessionId);
  }
  getSessionAndQuestions = async () => {
    this.sessionId = this.route.snapshot.params.sessionId;
    this.user = this.auth.getUser();
    this.sessionHttpService.getSessionMetadataById(this.sessionId).subscribe(session => {
      this.session = session;
      this.userIsAdmin = (this.user && this.session && this.user.id === this.session.ownerUid)
    });
    this.questionsService.getQuestions(this.sessionId).subscribe(questions => {
      this.questions = questions;
    });

    this.upvotedQuestions = JSON.parse(localStorage.getItem('upvotedQuestions')) || [];
  }

  clearQuestions = () => {
    this.questionsService.clearQuestions(this.sessionId);
    this.confirmClear = false;
  }

  upvoteQuestion = (question: Question) => {
    if (this.userHasUpvoted(question)) {
      question.upvotes--;
      this.upvotedQuestions.splice(this.upvotedQuestions.indexOf(question._id), 1);
    } else {
      question.upvotes++;
      this.upvotedQuestions.push(question._id);
    }

    this.questionsService.sendQuestion(question);
    localStorage.setItem('upvotedQuestions', JSON.stringify(this.upvotedQuestions));
  }

  addQuestion = () => {
    this.newQuestion.sessionId = this.sessionId;
    this.questionsService.createQuestion(this.newQuestion);
    this.newQuestion = {
      _id: null,
      questionText: null,
      upvotes: 0,
      sessionId: this.sessionId
    };
  }

  remove = (question: Question) => {
    this.questionsService.removeQuestion(question);
  }

  edit = (question: Question) => {
    this.questionsService.sendQuestion(question);
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

  userHasUpvoted = (question: Question): boolean => {
    return this.upvotedQuestions.indexOf(question._id) >= 0;
  }
}
