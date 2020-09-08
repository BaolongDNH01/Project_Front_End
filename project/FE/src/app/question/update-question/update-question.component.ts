import { Component, OnInit } from '@angular/core';
import {Test} from '../../test/test';
import {Observable} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Question} from '../question';
import {QuestionService} from '../question.service';
import {TestService} from '../../test/test_service/test.service';
import {Subject} from '../subject';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {
  strTestCode = '';
  listSubject: Subject[];
  id: string;
  arr: string[];
  test: Test;
  testQuestion: Test;
  listTestCode = '';
  listTestQuestion = new Array();
  testIdList = new Array();
  testCodeQuestion = new Array();
  public keyword = 'testCode';

  public data$: Observable<Test[]>;
  public keywords = ['testCode'];

  listAllTest: Test[];
  formQuestion: FormGroup;
  arrAnswer = [];
  question: Question;
  listQuestion: Question[] = [];
  error = '';
  constructor(private questionService: QuestionService, private fb: FormBuilder,
              private testService: TestService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.data$ = questionService.getAllTest();
    activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });
  }
  ngOnInit(): void {

    this.questionService.findById(this.id).subscribe(
      next => {
        this.question = next;
        this.formQuestion.patchValue({questionId: this.question.questionId});
        this.formQuestion.patchValue({question: this.question.question});
        this.formQuestion.patchValue({answerAndRight: {answer: (this.question.answerA + '\n' +
              this.question.answerB + '\n' + this.question.answerC + '\n' + this.question.answerD)}});
        this.formQuestion.patchValue({question: this.question.question});
        this.formQuestion.patchValue({question: this.question.question});
        this.formQuestion.patchValue({answerAndRight: {rightAnswer: this.question.rightAnswer}});
        this.formQuestion.patchValue({subjectId: this.question.subjectId});
        let test: Test;
        for (let i = 0; i < this.question.testId.length; i++){
          this.testService.findById(this.question.testId[i]).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            next => {
              test = next;
              console.log('c' + test.testCode);
            }, error => {
              test = new Test();
            }, () => {
              this.strTestCode += (test.testCode + ' ');
              this.formQuestion.patchValue({testCodeList: this.strTestCode});
            }
          );
        }
      }, error => {
      }, () => {
        this.listTestCode = this.strTestCode;
        this.questionService.getAllQuestion().subscribe(
          next => {
            this.listQuestion = next;
          }, error => {
            this.listQuestion = new Array();
          }, () => {
            this.questionService.getAllTest().subscribe(
              next => {
                this.listAllTest = next;
              }, error => {
                this.listAllTest = new Array();
              }, () => {
                this.questionService.getAllSubject().subscribe(
                  next => {
                    this.listSubject = next;
                  }, error => {
                    this.listSubject = new Array();
                  }
                );
              }
            );
          }
        );
      }
    );
    this.formQuestion = this.fb.group({
      questionId: ['', [Validators.required]],
      question: ['', [Validators.required]],
      answerAndRight: this.fb.group({
        answer: ['', [Validators.required, checkAnswer]],
        rightAnswer: ['', [Validators.required]],
      }, {validators: checkRightAnswer}),
      testCodeList: ['', [Validators.required]],
      answerA: [''],
      answerB: [''],
      answerC: [''],
      answerD: [''],
      subjectId: ['', [Validators.required]],
      testCode: ['']
    });
  }
  addQuestion(): void{
    this.splitAnswer();
    this.testCodeQuestion =  this.formQuestion.value.testCodeList.split(' ');
    for (let i = 0; i < this.testCodeQuestion.length - 1; i++){
      this.testQuestion = this.listAllTest.find(test => test.testCode === this.testCodeQuestion[i] );
      console.log(this.testQuestion);
      this.listTestQuestion.push(this.testQuestion);
    }
    for (let i = 0; i < this.listTestQuestion.length; i++){
      this.testIdList.push(Number(this.listTestQuestion[i].testId));
    }
    console.log(this.testIdList);
    this.question = new Question(
      this.formQuestion.value.questionId,
      this.formQuestion.value.question,
      this.formQuestion.value.answerA,
      this.formQuestion.value.answerB,
      this.formQuestion.value.answerC,
      this.formQuestion.value.answerD,
      this.formQuestion.value.answerAndRight.rightAnswer,
      this.testIdList,
      this.formQuestion.value.subjectId,
    );
    this.questionService.saveQuestion(this.question).subscribe(
      next => {},
      error => {},
      () => {
        this.error = '';
        this.questionService.getAllQuestion().subscribe(
          next => {
            this.listQuestion = next;
          }, error => {
            this.listQuestion = new Array();
          }, () => {
            console.log(this.listQuestion.length);
            this.router.navigateByUrl('/question');
          }
        );
      }
    );
  }
  splitAnswer(): void {
    this.arrAnswer = this.formQuestion.value.answerAndRight.answer.split('\n');
    this.formQuestion.value.answerA = this.arrAnswer[0];
    this.formQuestion.value.answerB = this.arrAnswer[1];
    this.formQuestion.value.answerC = this.arrAnswer[2];
    this.formQuestion.value.answerD = this.arrAnswer[3];
  }
  inputTesst(): void{
    this.test = Object.assign({}, this.formQuestion.value.testCode);
    this.questionService.getAllTest().subscribe(
      next => {
        this.listAllTest = next;
      }, error => {
        this.listAllTest = new Array();
      }
    );
    for (let i = 0; i < this.listAllTest.length; i++){
      if (this.test.testCode === this.listAllTest[i].testCode){
        this.listTestCode += (this.test.testCode + ' ');
        return;
      }
    }
  }

  reset(): void{
    this.listTestCode = '';
  }
}
function checkAnswer(formControl: AbstractControl): any {
  let arr = [];
  arr = formControl.value.split('\n');
  if (arr.length !== 4){
    return {check: true};
  }else {
    if (arr[0] === '' || arr[1] === '' || arr[2] === '' || arr[3] === ''){
      return {check: true};
    }
  }
  return null;
}
function checkRightAnswer(formControl: AbstractControl): any {
  const arrCheck =  formControl.value.answer.split('\n');
  console.log(arrCheck[0].length);
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < arrCheck.length; i++ ) {
    if (formControl.value.rightAnswer === arrCheck[i]){
      return null;
    }
  }
  return {checkRightAnswer: true};
}
