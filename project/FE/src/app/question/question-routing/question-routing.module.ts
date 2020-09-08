import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {QuestionBankListComponent} from '../question-bank-list/question-bank-list.component';
import {QuestionBankDeleteComponent} from '../question-bank-delete/question-bank-delete.component';
import {AddQuestionComponent} from '../add-question/add-question.component';
import {UpdateQuestionComponent} from "../update-question/update-question.component";

const routes: Routes = [
  {
    path: 'question-list',
    children: [
      {path: '', component: QuestionBankListComponent},
      {path: 'question-delete/:id', component: QuestionBankDeleteComponent},
      {path: 'question-add', component: AddQuestionComponent},
      {path: 'question-update/:{id}', component: UpdateQuestionComponent}
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
