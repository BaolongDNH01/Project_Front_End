import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {ExamService} from '../exam_service/exam.service';
import {QuestionService} from '../../question/question.service';
import {Subject} from '../../question/subject';

@Component({
  selector: 'app-top-point',
  templateUrl: './top-point.component.html',
  styleUrls: ['./top-point.component.css']
})
export class TopPointComponent implements OnInit {
  listUserPoint = new Array();
  subjectList: Subject[];
  constructor(private examService: ExamService, private questionService: QuestionService) {
    questionService.getAllSubject().subscribe(
      next => {
        this.subjectList = next;
      }, error => {
        this.subjectList = new Array();
      }, () => {
        examService.findUserTopPositive().subscribe(
          next => {
            this.listUserPoint = next;
          }, error => {
            this.listUserPoint = new Array();
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }
  topUser(subjectId: any) {
    if (subjectId === '0') {
      this.examService.findUserTopPositive().subscribe(
        next => {
          this.listUserPoint = next;
        }, error => {
          this.listUserPoint = new Array();
        }
      );
    }
    else {
      this.examService.findTopUserExamSubject(subjectId).subscribe(
        next => {
          this.listUserPoint = next;
        }, error => {
          this.listUserPoint = new Array();
        }, () => {
        }
      );
    }
  }
  getBackground(index: number): string{
    switch (index) {
      case 0: {
        return '#F2DEDE';
      }case 1: {
        return '#D9EDF7';
      }case 2: {
        return '#DFF0D8';
      }case 3: {
        return '#DFF0D8';
      }case 4: {
        return '#D8F1F6';
      }
    }
  }
  getColor(index: number): string {
    switch (index) {
      case 0: {
        return '#A94442';
      }case 1: {
        return '#8A6D3B';
      }case 2: {
        return '#31708F';
      }case 3: {
        return '#3C763D';
      }case 4: {
        return '#3C763D';
      }
    }
  }
}

