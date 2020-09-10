import { Component, OnInit } from '@angular/core';
import {ExamModule} from '../../exam/exam.module';
import {Exam} from '../../exam/exam';
import {User} from '../user_model/User';

@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.css']
})
export class TestHistoryComponent implements OnInit {

  user: User;
  userId: number;
  exam: Exam;
  sum: number;
  avg: number;

  constructor() { }

  ngOnInit(): void {
  }

}
