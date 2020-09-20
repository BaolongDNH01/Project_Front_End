import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
// import {AddQuestionComponent} from './add-question/add-question.component';

import {QuestionBankListComponent} from './question-bank-list/question-bank-list.component';
import {QuestionBankDeleteComponent} from './question-bank-delete/question-bank-delete.component';
import {QuestionRoutingModule} from './question-routing/question-routing.module';
import {QuestionService} from './question.service';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {QuestionListInTheExamComponent} from './question-list-in-the-exam/question-list-in-the-exam.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import {UpdateQuestionComponent} from './update-question/update-question.component';
import {AddQuestionComponent} from './add-question/add-question.component';
import {AddQuestionInExamComponent} from './add-question-in-exam/add-question-in-exam.component';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [QuestionBankListComponent, QuestionBankDeleteComponent, AddQuestionComponent, UpdateQuestionComponent, AddQuestionInExamComponent
    , QuestionListInTheExamComponent],

    imports: [
        CommonModule,
        QuestionRoutingModule,
        RouterModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        AutocompleteLibModule,
        NgxPaginationModule
    ],
  exports: [
    QuestionBankListComponent,
    QuestionListInTheExamComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    AddQuestionInExamComponent

  ],
  providers: [
    QuestionService
  ]
})
export class QuestionModule {
}
