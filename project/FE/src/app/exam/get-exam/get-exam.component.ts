import {Component, OnInit} from '@angular/core';
import {Exam} from '../exam';
import {ExamService} from '../exam_service/exam.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Test} from '../../test/test';
import {TestService} from '../../test/test_service/test.service';

@Component({
  selector: 'app-get-exam',
  templateUrl: './get-exam.component.html',
  styleUrls: ['./get-exam.component.css']
})
export class GetExamComponent implements OnInit {

  exam: Exam = new Exam();
  test: Test;

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute, private testService: TestService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('examId'));

      this.examService.findById(id).subscribe(
        (next) => {
          this.exam = next;
        }
      );
      this.testService.findById(this.exam.test).subscribe(
        (next) => {
          this.test = next;
        }
      );
    });

  }

}
