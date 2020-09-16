import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {Question} from '../question';
import {Router} from '@angular/router';
import {JwtService} from '../../login/services/jwt.service';


@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['../../../assets/css/style-table-question.css']
})
export class QuestionBankListComponent implements OnInit {
  question: Question[];
  numberCount = 1;
  roles: string[];

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private jwt: JwtService
  ) {
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
    if(event.target.files.item(0).name.includes('.txt')){
      console.log(event);
      this.questionService.upload(event.target.files.item(0)).subscribe();
      this.router.navigateByUrl("/question")
    }else {
      alert("The file is not in the correct format!")
    }

  }

  close() {
    this.router.navigateByUrl('/');
  }
}
