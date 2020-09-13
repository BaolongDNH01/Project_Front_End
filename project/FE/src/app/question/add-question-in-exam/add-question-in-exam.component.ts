import {Component, OnInit} from '@angular/core';
import {Question} from '../Question';
import {QuestionService} from '../question.service';
import {TestService} from '../../test/test_service/test.service';

@Component({
  selector: 'app-add-question-in-exam',
  templateUrl: './add-question-in-exam.component.html',
  styleUrls: ['./add-question-in-exam.component.css']
})
export class AddQuestionInExamComponent implements OnInit {
  question: Question[];
  listQuestionInExamAdd: string[] = [];

  constructor(
    private questionService: QuestionService,
    private testService: TestService
  ) {
  }

  ngOnInit(): void {
    this.questionService.getAllQuestion().subscribe(
      next => this.question = next
    );
  }

  chooseToAdd(questionId: string): void {
    this.listQuestionInExamAdd.push(questionId);
    console.log(this.listQuestionInExamAdd);
  }

  filterQuestion(): void {

  }

  addQuestionList() {
    // this.testService.addTest().subscribe();
  }
}
