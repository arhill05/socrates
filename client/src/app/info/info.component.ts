import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SessionHttpService } from '../services/session-http.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  sessionId: string;
  session: any;
  constructor(private auth: AuthService,
    private route: ActivatedRoute,
    private sessionHttp: SessionHttpService) { }

  ngOnInit() {
    this.sessionId = this.route.snapshot.params.sessionId;
    if (!this.sessionId) this.sessionId = this.auth.getActiveSession();
    this.sessionHttp.getSessionMetadataById(this.sessionId).subscribe(session => {
      this.session = session;
    });
  }

}
