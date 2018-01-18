import { Component, OnInit } from '@angular/core';
import { SessionHttpService } from '../services/session-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private sessionService: SessionHttpService) { }

  ngOnInit() {
    this.sessionService.getSessionById('123').subscribe(session => {
      console.log(session);
    });
  }

}
