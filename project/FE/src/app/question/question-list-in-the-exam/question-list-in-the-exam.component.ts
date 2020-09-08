import {Component, OnInit} from '@angular/core';
import {Question} from '../Question';
import {QuestionService} from '../question.service';

@Component({
  selector: 'app-question-list-in-the-exam',
  templateUrl: './question-list-in-the-exam.component.html',
  styleUrls: ['../../../assets/css/style-table-question.css']
})
export class QuestionListInTheExamComponent implements OnInit {
  question: Question[];
  listQuestionInExamDelete: string[] = [];

  constructor(
    private questionService: QuestionService
  ) {
  }

  ngOnInit(): void {
    this.questionService.getAllQuestion().subscribe(
      next => {
        this.question = next;
      }, error => {
        this.question = new Array();
      }
    );
  }

  addQuestionList(): void {
    console.log('test');
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
    this.questionService.deleteQuestion(this.listQuestionInExamDelete).subscribe(
      () => null,
      () => null,
      () => this.questionService.getAllQuestion()
    );
  }

}
