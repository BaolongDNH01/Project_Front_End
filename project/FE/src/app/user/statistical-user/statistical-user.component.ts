import { Component, OnInit } from '@angular/core';
import {User} from '../user_model/User';
import {Exam} from '../../exam/exam';
import {UserService} from '../user_service/user.service';

@Component({
  selector: 'app-statistical-user',
  templateUrl: './statistical-user.component.html',
  styleUrls: ['./statistical-user.component.css']
})
export class StatisticalUserComponent implements OnInit {
  // tslint:disable-next-line:new-parens
  user: User ;
  totalUser = 0;
  listUser: User[];
  nameUser = '';
  constructor(private userService: UserService) {
    userService.findUserNew().subscribe(
      next => {
        this.user = next;
      }, error => {
        // tslint:disable-next-line:new-parens
        this.user = new class implements User {
          address: string;
          avatar: string;
          email: string;
          examList: Exam[];
          fullName: string;
          id: number;
          phoneNumber: string;
          // tslint:disable-next-line:variable-name
          user_Password: string;
          username: string;
        };
      }, () => {
        userService.getTotalUser().subscribe(
          next => {
            this.totalUser = next;
          }, error => {
          }, () => {
            this.nameUser = this.user.username;
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

}
