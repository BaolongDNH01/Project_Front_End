import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { QuestionBankListComponent } from './question-bank/question-bank-list/question-bank-list.component';
import { QuestionBankDeleteComponent } from './question-bank/question-bank-delete/question-bank-delete.component';
import {QuestionRoutingModule} from './question-routing/question-routing.module';
import {QuestionService} from './question.service';



@NgModule({
  declarations: [QuestionBankListComponent, QuestionBankDeleteComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule
  ],
  exports: [
    QuestionBankListComponent
  ],
  providers: [
   QuestionService
  ]
})
export class QuestionModule { }
