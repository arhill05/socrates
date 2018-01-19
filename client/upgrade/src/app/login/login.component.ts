import { Component, OnInit } from '@angular/core';
import { SessionHttpService } from '../services/session-http.service';
import { QuestionWsService } from '../services/question-ws.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  questions: any[] = [];
  session: any;
  constructor(private sessionService: SessionHttpService,
    private questionsService: QuestionWsService) { }

  ngOnInit() {
    this.sessionService.getSessionMetadataById('999999').subscribe(session => {
      console.log(session);
      this.session = session;
    });

    this.questionsService.getQuestions('999999').subscribe(questions => {
      this.questions = questions;
    })
  }

  sendQuestion = () => {
    if(this.questions.length) {
      const question = this.questions[0];
      question.upvotes++;
      const questionReq = { sessionId: '999999', question };
      this.questionsService.sendQuestion(questionReq);
    }
  }

}
