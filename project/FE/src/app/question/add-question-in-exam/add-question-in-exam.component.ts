import {Component, OnInit} from '@angular/core';
import {Question} from "../question";
import {QuestionService} from '../question.service';
import {TestService} from '../../test/test_service/test.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {loggedIn} from '@angular/fire/auth-guard';
import {QuestionInExam} from '../question-in-exam';
import {JwtService} from '../../login/services/jwt.service';

@Component({
  selector: 'app-add-question-in-exam',
  templateUrl: './add-question-in-exam.component.html',
  styleUrls: ['./add-question-in-exam.component.css']
})
export class AddQuestionInExamComponent implements OnInit {
  question: Question[];
  listQuestionInExamAdd: string[] = [];
  idTest: number;
  idSubjectInTest: number;
  roles: string[];
  constructor(
    private questionService: QuestionService,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
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
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idTest = parseInt(paramMap.get('id'));
    });
      this.ListQuestionAddTest();
  }
  ListQuestionAddTest(): void {
    this.testService.findById(this.idTest).subscribe(
      next => {
        this.idSubjectInTest = next.subjectId;
        this.questionService.getQuestionAllToTest(this.idTest, this.idSubjectInTest).subscribe(
          list => {
            if(list.length > 0){
              this.question = list
            }else {
              alert("No related question found !")
              this.router.navigateByUrl("/list-question-in-exam")

            }
          }
        );
      })
  }

  chooseToAdd(questionId: string): void {
    if (this.listQuestionInExamAdd.includes(questionId)) {
      this.listQuestionInExamAdd.splice(this.listQuestionInExamAdd.indexOf(questionId), 1);
    } else {
      this.listQuestionInExamAdd.push(questionId);
    }
  }


  addQuestionList(): void {
    this.questionService.addQuestionInExam(this.idTest, this.listQuestionInExamAdd).subscribe(
      () => null,
      () => null,
      () => this.ListQuestionAddTest()
    );
    this.router.navigateByUrl('/list-question-in-exam');
  }

  close() {
    this.router.navigateByUrl('/list-question-in-exam')
  }
}
