import {Component, OnInit} from '@angular/core';
import {Exam} from '../exam';
import {ExamService} from "../exam_service/exam.service";
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-get-exam',
  templateUrl: './get-exam.component.html',
  styleUrls: ['./get-exam.component.css']
})
export class GetExamComponent implements OnInit {

  exam: Exam = new Exam();

  constructor(private examService: ExamService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('examId'));

      this.examService.findById(id).subscribe(
        (next) => {
          this.exam = next;
        }
      );
    });
  }

}
