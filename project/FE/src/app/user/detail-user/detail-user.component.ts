import { Component, OnInit } from '@angular/core';
import {UserService} from '../user_service/user.service';
import {TokenStorageService} from './token-storage.service';
import {User} from '../user_model/User';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  user: User;
  userId: number;

  constructor(
    private userService: UserService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.userId = this.tokenStorageService.getUser().id;
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data;
    });
  }

}
