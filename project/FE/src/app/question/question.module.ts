import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionService} from './question_service/question.service';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionBankListComponent } from './question-bank/question-bank-list/question-bank-list.component';

@NgModule({
  declarations: [AddQuestionComponent,
                QuestionBankListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AddQuestionComponent,
    QuestionBankListComponent
  ],
  providers: [QuestionService]
})
export class QuestionModule { }
