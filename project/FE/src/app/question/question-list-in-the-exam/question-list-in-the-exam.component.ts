import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../question.service';
import {QuestionInExam} from '../question-in-exam';
import {Router} from '@angular/router';

import {Exam} from '../../exam/exam';
import {ExamService} from '../../exam/exam_service/exam.service';

import {Question} from '../question';
import {TestService} from '../../test/test_service/test.service';


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
  exam: Exam[];
  idTestUpdating: number;
  idSubjectInTest: number;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private examService: ExamService,
    private testService: TestService
  ) {
  }

  ngOnInit(): void {
      this.findTestById(13);
  }

  findTestById(id: number) {
    this.testService.findById(id).subscribe(
      next => {
        console.log(next.questions);
        this.findQuestionInTest(next.questions);
        this.idTestUpdating = next.testId
      }
    );
  }

  findQuestionInTest(questions: string[]) {
    this.questionInExams = [];
    for (let i = 0; i < questions.length; i++) {
      this.questionService.findById(questions[i]).subscribe(
        question => {
          this.questionInExams.push(question);
        }
      );
    }
  }

  addQuestionList(): void {
    this.testService.findById(this.idTestUpdating).subscribe(
      next => {
        this.idSubjectInTest = next.subjectId;
      })

      this.router.navigateByUrl('question/add-question-in-exam/' + this.idTestUpdating);

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

}
