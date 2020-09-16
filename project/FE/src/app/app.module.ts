import { LoginModule } from './login/login.module';
import { httpInterceptorProviders } from './login/auth/auth-http.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';

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
import {InfoComponent} from "./user/info/info.component";
import {NgxPaginationModule} from 'ngx-pagination';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import { DefaultPageComponent } from './default-page/default-page.component';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    FormDirective,
    InfoComponent,
    DefaultPageComponent,
    ListComponent,
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
    NgxPaginationModule,
    LoginModule,
    SocialLoginModule,
    AngularFirestoreModule,
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    httpInterceptorProviders,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '570845823533-rd5op7viidgmviib1mcgh9jqkmqlhf7q.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('242813840370623'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    AngularFirestore,
  ],
  bootstrap: [AppComponent],
  exports: [FormDirective]
})
export class AppModule { }
