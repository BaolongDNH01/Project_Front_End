import {Component, OnInit} from '@angular/core';
import {Question} from '../Question';
import {QuestionService} from '../question.service';
import {QuestionInExam} from '../question-in-exam';
import {Router} from '@angular/router';

// @ts-ignore
@Component({
  selector: 'app-question-list-in-the-exam',
  templateUrl: './question-list-in-the-exam.component.html',
  styleUrls: ['../../../assets/css/style-table-question.css']
})
export class QuestionListInTheExamComponent implements OnInit {
  question: Question[];
  listQuestionInExamDelete: string[] = [];
  questionInExams: Array<QuestionInExam> = [];
  questionInExam: QuestionInExam;
  count = 1;
  constructor(
    private questionService: QuestionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.questionService.getAllQuestionInExam().subscribe(
      next => {
        // @ts-ignore
        this.questionInExam = next;
      }, error => {
        // this.questionInExams = new Array();
      }
    );
  }

  addQuestionList(): void {
    this.questionService.getAllQuestion().subscribe(
      next => {

        // this.questionInExam = next;
        //         //
        //         // this.questionService.saveQuestionInExam(next);
        this.toQuestionInExamArr(next);
      }, error => {
        this.question = new Array();
      }
    );
  }

  toQuestionInExamArr(arr: Question[]): void {
    // tslint:disable-next-line:prefer-for-of
    if (this.questionInExams.length === 0) {
      for (let i = 0; i < 10; i++) {
        const randNum = Math.floor(Math.random() * arr.length);
        this.questionInExam = new QuestionInExam();
        this.questionInExam.questionId = arr[randNum].questionId;
        this.questionInExam.question = arr[randNum].question;
        this.questionInExam.rightAnswer = arr[randNum].rightAnswer;
        this.questionInExams.push(this.questionInExam);
        arr.splice(randNum, 1);
      }
      // console.log(this.questionInExams);
      // tslint:disable-next-line:prefer-for-of
      this.questionService.saveQuestionInExam(this.questionInExams).subscribe();
    }else {
      alert('ko cho add');
    }
  }

  chooseToDelete(questionId: string): void {
    if (this.listQuestionInExamDelete.includes(questionId)) {
      this.listQuestionInExamDelete.splice(this.listQuestionInExamDelete.indexOf(questionId), 1);
    } else {
      this.listQuestionInExamDelete.push(questionId);
    }
    console.log(this.listQuestionInExamDelete.length);
  }

  deleteQuestion(): void {
    // @ts-ignore
    this.questionService.deleteQuestionInExam(this.listQuestionInExamDelete).subscribe(
      () => null,
      () => null,
      () => this.questionService.getAllQuestion()
    );
    this.router.navigateByUrl('/question');
  }

}
