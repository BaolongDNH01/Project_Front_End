import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {Question} from '../question';
import {Router} from '@angular/router';
import {JwtService} from '../../login/services/jwt.service';
import {Subject} from '../subject';


@Component({
  selector: 'app-question-bank-list',
  templateUrl: './question-bank-list.component.html',
  styleUrls: ['./question-bank-list.component.css']
})
export class QuestionBankListComponent implements OnInit {
  question: Question[];
  questionShow: Question[] = [];
  numberCount = 1;
  roles: string[];
  id: number;
  curpage = 1;
  test: number[];
  subject = new Subject();
  subjectList: Subject[];
  subjectNameDr = 'All Question';

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private jwt: JwtService,
  ) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0) {
      router.navigateByUrl('**');
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER') {
        router.navigateByUrl('**');
        return;
      }
    });
  }

  ngOnInit(): void {
    this.listQuestion();
  }

  listQuestion() {
    this.questionService.getAllQuestion().subscribe(
      next => {
        this.question = next;
        this.questionShow = this.question;
      }, error => {
        this.question = new Array();
      }, () => {
        for (let i = 0; i < this.question.length; i++) {
          this.question[i].no = this.numberCount++;
        }
      });
    this.questionService.getAllSubject().subscribe(
      list => this.subjectList = list
    );
  }

  selectFile(event): void {
    if (event.target.files.item(0).name.includes('.txt')) {
      if (event.target.files.item(0).size === 0) {
        alert('File Empty');
        return;
      }
      this.questionService.upload(event.target.files.item(0)).subscribe();
      this.router.navigateByUrl('/list/question').then(window.location.reload);
    } else {
      alert('The file is not in the correct format!');
    }

  }

  close() {
    this.router.navigateByUrl('/');
  }

  find(subjectName: string) {
    this.questionShow = [];
    this.subjectNameDr = subjectName;
    this.question.forEach(q => {
      if (q.subjectName === subjectName) {
        this.questionShow.push(q);
      }
    });
  }
}
