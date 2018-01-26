import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { StartComponent } from './start/start.component';
import { AccountComponent } from './account/account.component';
import { InfoComponent } from './info/info.component';
import { SessionComponent } from './session/session.component';
import { LoginComponent } from './login/login.component';
import { SessionHttpService } from './services/session-http.service';
import { QuestionWsService } from './services/question-ws.service';
import { AuthService } from './services/auth.service';
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';

const appRoutes: Routes = [
  {
    path: '',
    component: StartComponent
  },
  {
    path: 'questions/:sessionId',
    component: SessionComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    path: 'info/:sessionId',
    component: InfoComponent
  },
  {
    path: 'user/account',
    component: AccountComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    AccountComponent,
    InfoComponent,
    SessionComponent,
    LoginComponent,
    ActionButtonsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HttpClient,
    SessionHttpService,
    QuestionWsService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    document.querySelector('#loader').remove();
  }
}
