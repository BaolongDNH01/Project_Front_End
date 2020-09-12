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
  timeSet = 15 * 60;
  time = this.timeSet;
  display;
  interval;
  mark = 0;
  myDate = new Date();

  constructor(private fb: FormBuilder, private testService: TestService, private examService: ExamService,
              private questionService: QuestionService, private router: Router,
              private activatedRoute: ActivatedRoute, private datePipe: DatePipe) {
    this.examForm = this.fb.group({
      answer: this.answerArr,
      times: [''],
      userId: ['']
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
          this.test.questions.forEach(item => {
            this.questionService.findById(item).subscribe(
              next => {
                this.listQuestion.push(next);
              }, error => {
              }, () => {
                console.log(this.listQuestion);
                console.log(this.listQuestion[0]);
                this.createArrAnswer();
              });
          });

        });
    });

    this.startTimer();
  }

  createArrAnswer() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listQuestion.length; i++) {
      this.answerArr.push(new FormControl(''));
    }
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.exam = Object.assign({}, this.examForm.value);
    this.exam.examDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.exam.testId = this.test.testId;
    this.caculationMark();
    this.exam.answer = this.exam.answer.toString();
    this.exam.times = this.timeSet - this.time;
    console.log(this.exam);
    this.examService.save(this.exam).subscribe(
      next => {
        console.log('Create process!');
      }, error => {
        console.log('Create failed!');
      },
    );
    // this.router.navigateByUrl('');

  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time === 0) {
        this.onSubmit();
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
        this.mark += 0.5;
      }
    }
    this.exam.mark = this.mark;
  }


}
