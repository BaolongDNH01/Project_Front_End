import {Component, OnInit} from '@angular/core';
import {Exam} from '../exam';
import {ExamService} from '../exam_service/exam.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Test} from '../../test/test';
import {TestService} from '../../test/test_service/test.service';
import {Question} from '../../question/question';
import {QuestionService} from '../../question/question.service';


@Component({
  selector: 'app-get-exam',
  templateUrl: './get-exam.component.html',
  styleUrls: ['./get-exam.component.css']
})
export class GetExamComponent implements OnInit {

  exam: Exam = new Exam();
  test: Test = new Test();
  listQuestion = new Array<Question>();
  // tslint:disable-next-line:ban-types
  listAnswer = new Array<String>();


  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute,
              private testService: TestService, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));

      this.examService.findById(id).subscribe(
        (next) => {
          this.exam = next;
        }, error => {
        }, () => {
          this.listAnswer = this.exam.answer.split(',');
          this.testService.findById(this.exam.test).subscribe(
            (next) => {
              this.test = next;
            }, error => {
            }, () => {
              this.test.questions.forEach(item => {
                this.questionService.findById(item).subscribe(
                  next => {
                    this.listQuestion.push(next);
                  }, error => {
                  }, () => {
                  });
              });
            });
        }
      );
    });
  }

}
