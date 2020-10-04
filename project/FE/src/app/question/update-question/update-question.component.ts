import { Component, OnInit } from '@angular/core';
import {Test} from '../../test/test';
import {Observable} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Question} from '../question';
import {QuestionService} from '../question.service';
import {TestService} from '../../test/test_service/test.service';
import {Subject} from '../subject';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {JwtService} from '../../login/services/jwt.service';

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
  roles: string[];
  numAnswer = 2;
  constructor(private questionService: QuestionService, private fb: FormBuilder,
              private testService: TestService, private activatedRoute: ActivatedRoute, private router: Router, private jwt: JwtService) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0){
      router.navigateByUrl('**');
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER'){
        router.navigateByUrl('**');
      }
    });
    this.data$ = questionService.getAllTest();
    activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = paramMap.get('id');
    });
    questionService.getAllQuestion().subscribe(
      next => {
        this.listQuestion = next;
      }, error => {
        this.listQuestion = new Array();
      }, () => {
        let num = 0;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.listQuestion.length; i++){
          if (this.id === this.listQuestion[i].questionId){
            num++;
            return;
          }
        }
        if (num === 0 ){
          router.navigateByUrl('**');
        }
      }
    );
  }
  ngOnInit(): void {

    this.questionService.findById(this.id).subscribe(
      next => {
        this.question = next;
        if (this.question.answerC !== '' && this.question.answerD === ''){
          this.numAnswer = 3;
        }else if (this.question.answerC !== '' && this.question.answerD !== ''){
          this.numAnswer = 4;
        }
        this.formQuestion.patchValue({answerAndRight: {numAnswer: this.numAnswer}})
        this.formQuestion.patchValue({questionId: this.question.questionId});
        this.formQuestion.patchValue({question: this.question.questionName});
        this.formQuestion.patchValue({answerAndRight: {answerA: this.question.answerA}});
        this.formQuestion.patchValue({answerAndRight: {answerB: this.question.answerB}});
        this.formQuestion.patchValue({answerAndRight: {answerC: this.question.answerC}});
        this.formQuestion.patchValue({answerAndRight: {answerD: this.question.answerD}});
        this.formQuestion.patchValue({answerAndRight: {rightAnswer: this.question.rightAnswer}});
        this.formQuestion.patchValue({subjectId: this.question.subjectId});
        let test: Test;
        for (let i = 0; i < this.question.testId.length; i++){
          this.testService.findById(this.question.testId[i]).subscribe(
            // tslint:disable-next-line:no-shadowed-variable
            next => {
              test = next;
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
        answerA: ['', [Validators.required]],
        answerB: ['', [Validators.required]],
        answerC: [''],
        answerD: [''],
        rightAnswer: ['', [Validators.required]],
        numAnswer: [this.numAnswer]
      }, {validators: checkRightAnswer}),
      testCodeList: ['', [Validators.required]],
      subjectId: ['', [Validators.required]],
      testCode: [''],
    });
  }
  addQuestion(): void{
    this.testCodeQuestion =  this.formQuestion.value.testCodeList.split(' ');
    for (let i = 0; i < this.testCodeQuestion.length - 1; i++){
      this.testQuestion = this.listAllTest.find(test => test.testCode === this.testCodeQuestion[i] );
      this.listTestQuestion.push(this.testQuestion);
    }
    for (let i = 0; i < this.listTestQuestion.length; i++){
      this.testIdList.push(Number(this.listTestQuestion[i].testId));
    }
    this.question = new Question(
      this.formQuestion.value.questionId,
      this.formQuestion.value.question,
      this.formQuestion.value.answerAndRight.answerA,
      this.formQuestion.value.answerAndRight.answerB,
      this.formQuestion.value.answerAndRight.answerC,
      this.formQuestion.value.answerAndRight.answerD,
      this.formQuestion.value.answerAndRight.rightAnswer,
      this.testIdList,
      this.formQuestion.value.subjectId,
    );
    this.questionService.saveQuestion(this.question).subscribe(
      next => {},
      error => {},
      () => {
        this.router.navigateByUrl('/list/question');
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

  clickOneMore(){
    this.numAnswer++;
    this.formQuestion.patchValue({answerAndRight: {numAnswer: this.numAnswer}});
  }
  clickDelete(){
    this.numAnswer--;
    this.formQuestion.patchValue({answerAndRight: {numAnswer: this.numAnswer}});
    if (this.numAnswer === 3){
      this.formQuestion.patchValue({answerAndRight: {answerD: ''}});
    }
    if (this.numAnswer === 2){
      this.formQuestion.patchValue({answerAndRight: {answerC: ''}});
      this.formQuestion.patchValue({answerAndRight: {answerD: ''}});
    }
  }
}

function checkRightAnswer(formControl: AbstractControl): any {
  console.log('a' + formControl.value.numAnswer);
  if (formControl.value.numAnswer === 2){
    if (formControl.value.rightAnswer === formControl.value.answerA ||
      formControl.value.rightAnswer === formControl.value.answerB){
      return null;
    }
  } else if (formControl.value.numAnswer === 3){
    if (formControl.value.rightAnswer === formControl.value.answerA ||
      formControl.value.rightAnswer === formControl.value.answerB ||
      formControl.value.rightAnswer === formControl.value.answerC){
      return null;
    }
  } else if (formControl.value.numAnswer === 4){
    if (formControl.value.rightAnswer === formControl.value.answerA ||
      formControl.value.rightAnswer === formControl.value.answerB ||
      formControl.value.rightAnswer === formControl.value.answerC ||
      formControl.value.rightAnswer === formControl.value.answerD){
      return null;
    }
  }
  return {checkRightAnswer: true};
}
