import {Component, OnInit} from '@angular/core';
import {Question} from "../question";
import {QuestionService} from '../question.service';
import {TestService} from '../../test/test_service/test.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-add-question-in-exam',
  templateUrl: './add-question-in-exam.component.html',
  styleUrls: ['./add-question-in-exam.component.css']
})
export class AddQuestionInExamComponent implements OnInit {
  question: Question[];
  listQuestionIdInExam: string[] = [];
  listQuestionInExamAdd: string[] = [];
  idTest: number;

  constructor(
    private questionService: QuestionService,
    private testService: TestService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.idTest = parseInt(paramMap.get('id'));
    });


    this.questionService.getAllQuestion().subscribe(
      next => this.question = next
    );
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
      // () => this.findTestById(this.idTestUpdating)
    );
    this.router.navigateByUrl('/question/list-question-in-exam')
  }
}
