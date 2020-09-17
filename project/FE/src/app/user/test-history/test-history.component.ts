import {Component, OnInit} from '@angular/core';
import {Exam} from '../../exam/exam';
import {User} from '../user_model/User';
import {JwtService} from '../../login/services/jwt.service';
import {ExamService} from '../../exam/exam_service/exam.service';
import {UserService} from '../user_service/user.service';


@Component({
  selector: 'app-test-history',
  templateUrl: './test-history.component.html',
  styleUrls: ['./test-history.component.css']
})
export class TestHistoryComponent implements OnInit {

  user: User;
  username: string;
  examList: Exam[];
  sum: number;
  avg: number;
  currentPage = 1;

  constructor(private jwt: JwtService, private examService: ExamService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.examService.findExamByUserName(this.jwt.getUsername()).subscribe(
      next => {
        this.examList = next;
      });
    this.username = this.jwt.getUsername();
    this.userService.getUserByUsername(this.username).subscribe(data => {
      this.user = data;
    }, error => {
    }, () => {
      this.sum = this.userService.getTotalPoint(this.user);
      this.avg = this.userService.getAverage(this.user);
    });
  }


}
