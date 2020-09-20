import {Component, OnInit} from '@angular/core';
import {Test} from '../test';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {TestService} from '../test_service/test.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Exam} from '../../exam/exam';
import {ExamService} from '../../exam/exam_service/exam.service';
import {Question} from '../../question/question';
import {DatePipe} from '@angular/common';
import {QuestionService} from '../../question/question.service';
import {JwtService} from '../../login/services/jwt.service';

@Component({
  selector: 'app-get-test',
  templateUrl: './get-test.component.html',
  styleUrls: ['./get-test.component.css']
})
export class GetTestComponent implements OnInit {
  test: Test = new Test();
  exam: Exam = new Exam();
  examForm: FormGroup;
  listQuestion = new Array<Question>();
  answerArr = new FormArray([]);
  timeSet = 5 * 60;
  time = this.timeSet;
  display;
  interval;
  mark = 0;
  myDate = new Date();

  constructor(private fb: FormBuilder, private testService: TestService, private examService: ExamService,
              private questionService: QuestionService, private router: Router,
              private activatedRoute: ActivatedRoute, private datePipe: DatePipe, private jwt: JwtService) {
    this.examForm = this.fb.group({
      answer: this.answerArr,
    });

  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {

      const id = Number(paramMap.get('id'));
      this.testService.findById(id).subscribe(
        (next) => {
          this.test = next;
        }, error => {
        }, () => {
          if (this.test == null) {
            this.router.navigateByUrl('');
          }
          this.test.questions.forEach(item => {
            this.questionService.findById(item).subscribe(
              next => {
                this.listQuestion.push(next);
              }, error => {
              }, () => {

              });
          });
        });
    });
    this.createArrAnswer();
    this.startTimer();
    this.checkHaveUser();

  }

  createArrAnswer() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < 10; i++) {
      this.answerArr.push(new FormControl(''));
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.exam = Object.assign({}, this.examForm.value);
    this.exam.user = this.jwt.getUsername();
    this.exam.examDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.exam.test = this.test.testId;
    this.caculationMark();
    this.exam.answer = this.exam.answer.toString();
    this.exam.times = this.timeSet - this.time;
    this.examService.save(this.exam).subscribe(
      next => {
      }, error => {

      }, () => {
        this.router.navigateByUrl('history');
      });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.onSubmit();
        clearInterval(this.interval);
      } else {
        this.time--;
      }
      this.display = this.transformTime(this.time);
    }, 1000);
  }

  transformTime(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
  }

  caculationMark() {
    for (let i = 0; i < this.listQuestion.length; i++) {
      // tslint:disable-next-line:triple-equals
      if (this.exam.answer[i] == this.listQuestion[i].rightAnswer) {
        this.mark += 1;
      }
    }
    this.exam.mark = this.mark;
  }

  checkHaveUser() {
    if (this.jwt.getUser() == null) {
      this.router.navigateByUrl('');
    }
  }
}
