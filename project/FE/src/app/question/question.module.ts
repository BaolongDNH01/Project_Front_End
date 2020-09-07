import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddQuestionComponent} from './add-question/add-question.component';

import {QuestionBankListComponent} from './question-bank-list/question-bank-list.component';
import {QuestionBankDeleteComponent} from './question-bank-delete/question-bank-delete.component';
import {QuestionRoutingModule} from './question-routing/question-routing.module';
import {QuestionService} from './question.service';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({

  declarations: [QuestionBankListComponent, QuestionBankDeleteComponent, AddQuestionComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    QuestionBankListComponent
  ],
  providers: [
    QuestionService
  ]
})
export class QuestionModule {
}
