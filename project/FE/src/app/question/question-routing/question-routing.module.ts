import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuestionBankListComponent} from '../question-bank-list/question-bank-list.component';
import {QuestionBankDeleteComponent} from '../question-bank-delete/question-bank-delete.component';
import {AddQuestionComponent} from '../add-question/add-question.component';
import {UpdateQuestionComponent} from "../update-question/update-question.component";
import {ErrorPageComponent} from '../../error-page/error-page.component';
import {AddQuestionInExamComponent} from '../add-question-in-exam/add-question-in-exam.component';
import {QuestionInExam} from '../question-in-exam';

const routes: Routes = [
  {
    path: 'question',
    children: [
      {path: '', component: QuestionBankListComponent},
      {path: 'question-delete/:id', component: QuestionBankDeleteComponent},
      {path: 'add-question', component: AddQuestionComponent},
      {path: 'update-question/:id', component: UpdateQuestionComponent},
      {path: 'list-question-in-exam', component: QuestionInExam},
      {path: 'add-question-in-exam', component: AddQuestionInExamComponent},
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
