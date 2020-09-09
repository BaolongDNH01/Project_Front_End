import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {Question} from '../question';


@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['../../../assets/css/style-table-question.css']
})
export class QuestionBankListComponent implements OnInit {
  question: Question[];
  numberCount = 1;

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
      }, () => {
        for (let i = 0; i < this.question.length; i++) {
          this.question[i].no = this.numberCount++;
        }
      });
  }

  selectFile(event): void {
    this.questionService.upload(event.target.files.item(0)).subscribe();
  }
}
