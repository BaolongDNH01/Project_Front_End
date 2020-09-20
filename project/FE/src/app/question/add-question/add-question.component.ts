
import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Question} from '../question';
import {QuestionService} from '../question.service';
import {Test} from '../../test/test';
import {Observable} from 'rxjs';
import {Subject} from '../subject';
import {Router} from '@angular/router';
import {JwtService} from '../../login/services/jwt.service';
import validate = WebAssembly.validate;


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  listSubject: Subject[];
  arr: string[];
  test: Test;
  testQuestion: Test;
  listTestCode = '';
  listTestQuestion = [];
  testIdList = [];
  testCodeQuestion = [];
  public keyword = 'testCode';

  public data$: Observable<Test[]>;
  public keywords = ['testCode'];

  listAllTest: Test[];
  formQuestion: FormGroup;
  question: Question;
  listQuestion: Question[] = [];
  error = '';
  roles: string[];
  numAnswer = 2;

  constructor(private fb: FormBuilder, private questionService: QuestionService, private router: Router, private jwt: JwtService) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0){
      router.navigateByUrl('**');
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER'){
        router.navigateByUrl('**');
        return;
      }
    });
    this.data$ = questionService.getAllTest();
    questionService.getAllQuestion().subscribe(
      next => {
        this.listQuestion = next;
      }, error => {
        this.listQuestion = [];
      }, () => {
        this.questionService.getAllTest().subscribe(
          next => {
            this.listAllTest = next;
          }, error => {
            this.listAllTest = new Array();
          }, () => {
            questionService.getAllSubject().subscribe(
              next => {
                this.listSubject = next;
                this.formQuestion.patchValue({answerAndRight: {numAnswer: this.numAnswer}});
              }, error => {
                this.listSubject = new Array();
              }
            );
          }
        );
      }
    );
  }

  ngOnInit(): void {
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
    for (let i = 0; i < this.listQuestion.length; i++){
      if (this.formQuestion.value.questionId === this.listQuestion[i].questionId){
        this.error = 'Question Code already exist!';
        return;
      }
    }
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
  resetError(): void{
    this.error = '';
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


