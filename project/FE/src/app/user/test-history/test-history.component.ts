import { Component, OnInit } from '@angular/core';
import {Exam} from '../../exam/exam';
import {User} from '../user_model/User';
import {UserService} from "../user_service/user.service";
import {ExamService} from "../../exam/exam_service/exam.service";

@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.css']
})
export class TestHistoryComponent implements OnInit {

  user: User;
  userId: number;
  examList: Exam[];
  // sum: number;
  // avg: number;
  currentPage = 1;

  constructor(
    private userService: UserService,
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    this.getHistory()
  }

  getHistory() {
    this.examService.findExamByUserId(this.userId).subscribe(data => {
      this.examList = data;
    })
  }
}
