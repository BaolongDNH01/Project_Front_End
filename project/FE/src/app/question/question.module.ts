import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddQuestionComponent} from './add-question/add-question.component';

import {QuestionBankListComponent} from './question-bank-list/question-bank-list.component';
import {QuestionBankDeleteComponent} from './question-bank-delete/question-bank-delete.component';
import {QuestionRoutingModule} from './question-routing/question-routing.module';
import {QuestionService} from './question.service';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutocompleteLibModule} from "angular-ng-autocomplete";

@NgModule({

  declarations: [QuestionBankListComponent, QuestionBankDeleteComponent, AddQuestionComponent],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    AutocompleteLibModule
  ],
  exports: [
    QuestionBankListComponent,
    AddQuestionComponent
  ],
  providers: [
    QuestionService
  ]
})
export class QuestionModule {
}
