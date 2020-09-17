import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {UserService} from '../user_service/user.service';
import {User} from '../user_model/User';
import {Exam} from '../../exam/exam';
import {JwtService} from '../../login/services/jwt.service';
import {Router} from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  p = 1;
  userList: User[];
  roles: string[];

  constructor(private userService: UserService, private jwt: JwtService, private router: Router) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0) {
      router.navigateByUrl('**');
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER') {
        router.navigateByUrl('**');
        return;
      }
    });
    userService.findAllUser().subscribe(next => this.userList = next);
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
