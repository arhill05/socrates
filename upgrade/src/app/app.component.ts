import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { AngularFireObject } from 'angularfire2/database/interfaces';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'app';
  db: any;
  sessions: any[];
  sessionsRef: any;

  constructor(db: AngularFireDatabase) {
    this.db = db;
  }
  ngOnInit() {
  }
}
