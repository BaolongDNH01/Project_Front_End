import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamService} from './exam_service/exam.service';
import { TopPointComponent } from './top-point/top-point.component';
import { GetExamComponent } from './get-exam/get-exam.component';
import {FormsModule} from '@angular/forms';
import { PickTestComponent } from './pick-test/pick-test.component';
import {RouterModule} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [TopPointComponent, GetExamComponent, PickTestComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgxPaginationModule
  ],
  exports: [
    TopPointComponent
  ],
  providers: [ExamService]
})
export class ExamModule { }
