import {Component, OnInit} from '@angular/core';
import {Exam} from '../exam';
import {ExamService} from '../exam_service/exam.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Test} from '../../test/test';
import {TestService} from '../../test/test_service/test.service';
import {Question} from '../../question/question';


@Component({
  selector: 'app-get-exam',
  templateUrl: './get-exam.component.html',
  styleUrls: ['./get-exam.component.css']
})
export class GetExamComponent implements OnInit {

  exam: Exam = new Exam();
  test: Test;
  listQuestion: Question[];
  listAnswer: string[];

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute, private testService: TestService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('examId'));

      this.examService.findById(id).subscribe(
        (next) => {
          this.exam = next;
        }, error => {

        }, () => {
          this.testService.findById(this.exam.test).subscribe(
            (next) => {
              this.test = next;
            }, error => {

            }, () => {
              this.listQuestion = this.test.questions;
              this.listAnswer = this.exam.answer.split(',');
            }
          );
        }
      );

    });
  }

}
