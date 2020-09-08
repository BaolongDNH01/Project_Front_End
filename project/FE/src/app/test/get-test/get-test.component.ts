import {Component, OnInit} from '@angular/core';
import {Test} from '../test';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TestService} from '../test_service/test.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Exam} from '../../exam/exam';
import {ExamService} from '../../exam/exam_service/exam.service';

@Component({
  selector: 'app-get-test',
  templateUrl: './get-test.component.html',
  styleUrls: ['./get-test.component.css']
})
export class GetTestComponent implements OnInit {
  test: Test;
  exam: Exam;
  examForm: FormGroup;

  constructor(private fb: FormBuilder, private testService: TestService, private examService: ExamService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('testId'));

      this.testService.findById(id).subscribe(
        (next) => {
          this.test = next;
        }
      );
    });
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.exam = Object.assign({}, this.examForm.value);
    this.examService.save(this.exam).subscribe(
      next => {
        console.log('Create process!');
      }, error => {
        console.log('Create failed!');
      }
    );
    this.router.navigateByUrl('' + this.examService.findById(this.exam.examId));
  }
}
