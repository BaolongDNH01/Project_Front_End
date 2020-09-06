import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {QuestionService} from './question_service/question.service';
import { AddQuestionComponent } from './add-question/add-question.component';


@NgModule({
  declarations: [AddQuestionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    AddQuestionComponent
  ],
  providers: [QuestionService]
})
export class QuestionModule { }
