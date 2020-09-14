import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {UserService} from '../user_service/user.service';
import {User} from '../user_model/User';
import {Exam} from '../../exam/exam';

declare var $: any;
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  p = 1;
  userList: User[];

  constructor(private userService: UserService) {
    userService.findAllUser().subscribe(next => this.userList = next);
  }

  getTotalTime(user: User){
    let exam: Exam;
    let totalTime = 0;
    for (exam of user.examList){
      totalTime += exam.times;
    }
    return totalTime;
  }

  getTotalPoint(user: User){
    let exam: Exam;
    let totalPoint = 0;
    for (exam of user.examList){
      totalPoint += exam.mark;
    }
    return totalPoint;
  }

  deleteUser(id: number){
    this.userService.deleteUser(id).subscribe(res => {
      console.log(res.statusText);
      if (res.statusText === 'OK') {
        document.getElementById('message').innerText = 'This User Deleted!';
        $('#deletedStatus').modal();
      }
    }, error => {
      document.getElementById('message').innerText = 'This User Is Not Exist!';
      $('#deletedStatus').modal();
    });
  }

  ngOnInit(): void {

  }


}
