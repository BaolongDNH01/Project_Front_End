import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {UserModule} from './user/user.module';
import {TestModule} from './test/test.module';
import {AppRoutingModule} from './app-routing.module';
import {ExamModule} from './exam/exam.module';
import {QuestionModule} from './question/question.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    TestModule,
    AppRoutingModule,
    ExamModule,
    QuestionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
