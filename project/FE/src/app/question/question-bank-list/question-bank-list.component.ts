import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {Question} from '../Question';

@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['../../../assets/css/style-table-question.css']
})
export class QuestionBankListComponent implements OnInit {
  question: Question[];

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
      });
  }
  selectFile(event): void {
    this.questionService.upload(event.target.files.item(0)).subscribe();
  }
}
