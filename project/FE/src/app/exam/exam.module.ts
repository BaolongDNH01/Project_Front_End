import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamService} from './exam_service/exam.service';
import { TopPointComponent } from './top-point/top-point.component';
import { GetExamComponent } from './get-exam/get-exam.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [TopPointComponent, GetExamComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TopPointComponent
  ],
  providers: [ExamService]
})
export class ExamModule { }
