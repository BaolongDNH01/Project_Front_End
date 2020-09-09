import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {UserService} from '../user_service/user.service';
import {User} from '../user_model/User';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  currentPage = 1;
  userList: User[];

  constructor(private userService: UserService) {
    userService.findAllUser().subscribe(next => this.userList = next);
  }

  ngOnInit(): void {

  }





}
