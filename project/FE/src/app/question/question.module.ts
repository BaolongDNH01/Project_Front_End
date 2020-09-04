import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuestionService} from './question_service/question.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [QuestionService]
})
export class QuestionModule { }
