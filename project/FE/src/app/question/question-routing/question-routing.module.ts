import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuestionBankListComponent} from '../question-bank-list/question-bank-list.component';
import {QuestionBankDeleteComponent} from '../question-bank-delete/question-bank-delete.component';
import {UpdateQuestionComponent} from '../update-question/update-question.component';

const routes: Routes = [
  {
    path: 'question',
    children: [
      {path: '', component: QuestionBankListComponent},
      {path: 'question-delete/:id', component: QuestionBankDeleteComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class QuestionRoutingModule {
}
