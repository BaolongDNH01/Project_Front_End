
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionBankDeleteComponent} from './question/question-bank-delete/question-bank-delete.component';
import {GetExamComponent} from './exam/get-exam/get-exam.component';
import {GetTestComponent} from './test/get-test/get-test.component';
import {RegisterUserComponent} from './user/register-user/register-user.component';
import {ListUserComponent} from './user/list-user/list-user.component';
import { AdminComponent } from './login/components/admin/admin.component';
import { MemberComponent } from './login/components/member/member.component';
import {UpdateUserComponent} from './user/update-user/update-user.component';
import {TestHistoryComponent} from './user/test-history/test-history.component';
import {UpdatePasswordComponent} from './user/update-password/update-password.component';
import {DetailUserComponent} from './user/detail-user/detail-user.component';
import {TestListComponent} from './test/test-list/test-list.component';
import {AddTestComponent} from './test/add-test/add-test.component';
import {AddQuestionComponent} from './question/add-question/add-question.component';
import {UpdateQuestionComponent} from './question/update-question/update-question.component';
import {ErrorPageComponent} from './error-page/error-page.component';
import {AddQuestionInExamComponent} from './question/add-question-in-exam/add-question-in-exam.component';
import {QuestionBankListComponent} from './question/question-bank-list/question-bank-list.component';
import {QuestionListInTheExamComponent} from './question/question-list-in-the-exam/question-list-in-the-exam.component';
import {DefaultPageComponent} from './default-page/default-page.component';
import {ListComponent} from './list/list.component';
import {PickTestComponent} from './exam/pick-test/pick-test.component';


const routes: Routes = [
  {path: '', children: [
      {path: '', component: DefaultPageComponent},
      {path: 'user-register', component: RegisterUserComponent},
      {path: 'detail-user', component: DetailUserComponent},
      {path: 'list', component: ListComponent, children: [
          {path: 'user', component: ListUserComponent},
          {path: 'test', component: TestListComponent},
          {path: 'question', component: QuestionBankListComponent}
        ]},
      {path: ':subjectName', component: PickTestComponent}
    ]},
  {path: 'get-exam/:id', component: GetExamComponent},
  {path: 'getTestById/:id', component: GetTestComponent},
  {path: 'list-user', component: ListUserComponent},
  {path: 'list-question-bank', component: QuestionBankListComponent},
  {path: 'delete-question-bank/:id', component: QuestionBankDeleteComponent},
  {path: 'list-question-in-exam', component: QuestionListInTheExamComponent},
  {path: 'add-question-in-exam/:id', component: AddQuestionInExamComponent},
  { path: 'admin', component: AdminComponent },
  { path: 'member', component: MemberComponent },
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'update-question/:id', component: UpdateQuestionComponent },
  {path: 'addTest', component: AddTestComponent},
  {path: 'testManage', component: TestListComponent},
  {path: 'update-user/:id', component: UpdateUserComponent},
  {path: 'history', component: TestHistoryComponent},
  {path: 'update-password/:id', component: UpdatePasswordComponent},
  {path: 'update-avatar/:id', component: UpdatePasswordComponent},
  { path: '**', component: ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
