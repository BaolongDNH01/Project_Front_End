import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionBankDeleteComponent} from './question/question-bank-delete/question-bank-delete.component';
import {GetExamComponent} from './exam/get-exam/get-exam.component';
import {GetTestComponent} from './test/get-test/get-test.component';
import {RegisterUserComponent} from './user/register-user/register-user.component';
import {ListUserComponent} from './user/list-user/list-user.component';

const routes: Routes = [
  {path: 'question-delete', component: QuestionBankDeleteComponent},
  {path: 'user-register', component: RegisterUserComponent},
  {path: 'get-exam/:id', component: GetExamComponent},
  {path: 'getTestById/:id', component: GetTestComponent},
  {path: 'list-user', component: ListUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
