import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionService} from './question_service/question.service';
import { QuestionBankListComponent } from './question-bank/question-bank-list/question-bank-list.component';



@NgModule({
  declarations: [QuestionBankListComponent],
  imports: [
    CommonModule
  ],
  exports: [
    QuestionBankListComponent
  ],
  providers: [QuestionService]
})
export class QuestionModule { }
