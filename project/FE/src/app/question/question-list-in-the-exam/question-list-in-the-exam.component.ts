import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {QuestionInExam} from '../question-in-exam';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {Exam} from '../../exam/exam';
import {ExamService} from '../../exam/exam_service/exam.service';

import {Question} from '../question';
import {TestService} from '../../test/test_service/test.service';
import {JwtService} from '../../login/services/jwt.service';
import {Test} from '../../test/test';


// @ts-ignore
@Component({
  selector: 'app-question-list-in-the-exam',
  templateUrl: './question-list-in-the-exam.component.html',
  styleUrls: ['../../../assets/css/style-table-question.css']
})
export class QuestionListInTheExamComponent implements OnInit {
  question: Question[];
  testTitle: string;
  subjectName: string;
  listQuestionInExamDelete: string[] = [];
  questionInExams: Array<QuestionInExam> = [];
  exam: Exam[];
  idTestUpdating: number;
  idSubjectInTest: number;
  roles: string[];
  numberCount = 1;
  constructor(
    private questionService: QuestionService,
    private router: Router,
    private examService: ExamService,
    private testService: TestService,
    private jwt: JwtService,
    private activatedRoute: ActivatedRoute
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
      this.findTestById(parseInt(paramMap.get('id')));
    });

  }

  findTestById(id: number) {
    this.testService.findById(id).subscribe(
      next => {
        this.testTitle = next.testName;
        this.subjectName = next.subjectName;
        console.log(this.testTitle);
        console.log(next.questions);
        this.findQuestionInTest(next.questions);
        this.idTestUpdating = next.testId;
      }
    );
  }

  findQuestionInTest(questions: string[]) {
    this.questionInExams = [];
    for (let i = 0; i < questions.length; i++) {
      this.questionService.findById(questions[i]).subscribe(
        question => {
          this.questionInExams.push(question);
        },
        error => {},
        () => {

        }
      );
    }
  }

  addQuestionList(): void {
      this.router.navigateByUrl('add-question-in-exam/' + this.idTestUpdating);

  }

  chooseToDelete(questionId: string): void {
    if (this.listQuestionInExamDelete.includes(questionId)) {
      this.listQuestionInExamDelete.splice(this.listQuestionInExamDelete.indexOf(questionId), 1);
    } else {
      this.listQuestionInExamDelete.push(questionId);
    }
  }

  deleteQuestion(): void {

    this.questionService.deleteQuestionInExam(this.idTestUpdating, this.listQuestionInExamDelete).subscribe(
      () => null,
      () => null,
      () => this.findTestById(this.idTestUpdating)
    );
  }

  close(): void {
    this.router.navigateByUrl('/list/test');
  }
}
