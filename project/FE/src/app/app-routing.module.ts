import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionBankDeleteComponent} from './question/question-bank-delete/question-bank-delete.component';
import {RegisterUserComponent} from './user/register-user/register-user.component';

const routes: Routes = [
  {path: 'question-delete', component: QuestionBankDeleteComponent},
  {path: 'user-register', component: RegisterUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
