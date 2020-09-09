import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {QuestionService} from '../question.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Question} from '../question';

@Component({
  selector: 'app-question-bank-delete',
  templateUrl: './question-bank-delete.component.html',
  styleUrls: ['../../../assets/css/style-table-question.css']
})
export class QuestionBankDeleteComponent implements OnInit {
  question: Question;
  deleteQuestionForm: FormGroup;
  id: string;

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.questionService.findById(id).subscribe(
        next => {
          this.question = next;
          this.id = this.question.questionId;
          this.deleteQuestionForm.patchValue({
            questionId: this.question.questionId,
            question: this.question.question,
            answerA: this.question.answerA,
            answerB: this.question.answerB,
            answerC: this.question.answerC,
            answerD: this.question.answerD,
            rightAnswer: this.question.rightAnswer,
          });
        }
      );
    });
    this.deleteQuestionForm = new FormGroup({
      questionId: new FormControl(''),
      question: new FormControl(''),
      answerA: new FormControl(''),
      answerB: new FormControl(''),
      answerC: new FormControl(''),
      answerD: new FormControl(''),
      rightAnswer: new FormControl(''),
    });
  }

  onDeleteQuestion(): void {
    this.questionService.deleteQuestion(this.id).subscribe(
      next => {
        this.question = next;
      }
    );
    this.router.navigateByUrl('question');
    alert('Đã xóa câu hỏi : ' + this.question.question);
  }
}
