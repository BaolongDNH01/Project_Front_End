import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamService} from './exam_service/exam.service';
import { TopPointComponent } from './top-point/top-point.component';


@NgModule({
  declarations: [TopPointComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TopPointComponent
  ],
  providers: [ExamService]
})
export class ExamModule { }
