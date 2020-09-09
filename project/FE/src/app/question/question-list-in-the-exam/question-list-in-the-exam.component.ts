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
  questionInExam: QuestionInExam[];

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
        this.questionInExam = new Array();
      }
    );
  }

  addQuestionList(): void {
   this.questionService.getAllQuestion().subscribe(
      next => {
         // @ts-ignore
        this.questionInExam = next;
        // @ts-ignore
        this.questionService.saveQuestionInExam(this.questionInExam);
      }, error => {
        this.question = new Array();
      }
    );
  }

  chooseToDelete(questionId: string): void {
    if (this.listQuestionInExamDelete.includes(questionId)) {
      this.listQuestionInExamDelete.splice(this.listQuestionInExamDelete.indexOf(questionId), 1);
    } else {
      this.listQuestionInExamDelete.push(questionId);
    }
    console.log(this.listQuestionInExamDelete);
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
