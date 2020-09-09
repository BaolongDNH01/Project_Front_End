import { LoginModule } from './login/login.module';
import { httpInterceptorProviders } from './login/auth/auth-http.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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

    // Thiện update lần 2 - CẤM XOÁ ! //
    LoginModule
    /////////////////////////////////////
  ],

  // Thiện update lần 2 - CẤM XOÁ ! //
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [httpInterceptorProviders],
  /////////////////////////////////////

  bootstrap: [AppComponent],
  exports: [FormDirective]
})
export class AppModule { }
