import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {UserModule} from './user/user.module';
import {TestModule} from './test/test.module';
import {AppRoutingModule} from './app-routing.module';
import {ExamModule} from './exam/exam.module';
import {QuestionModule} from './question/question.module';
import {HttpClientModule} from '@angular/common/http';
import {QuestionRoutingModule} from './question/question-routing/question-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import {FormDirective} from './directive/form.directive';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    FormDirective,
  ],
  imports: [
    BrowserModule,
    UserModule,
    TestModule,
    AppRoutingModule,
    ExamModule,
    QuestionModule,
    HttpClientModule,
    QuestionRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [FormDirective]
})
export class AppModule { }
