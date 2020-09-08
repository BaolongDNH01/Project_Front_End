import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {QuestionBankDeleteComponent} from './question/question-bank-delete/question-bank-delete.component';
import {GetExamComponent} from './exam/get-exam/get-exam.component';
import {GetTestComponent} from './test/get-test/get-test.component';

const routes: Routes = [
  {path: 'question-delete', component: QuestionBankDeleteComponent},
  {path: 'get-exam/:id', component: GetExamComponent},
  {path: 'getTestById/:id', component: GetTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
