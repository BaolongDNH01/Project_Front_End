import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../user_service/user.service';

declare var $: any;
@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private service: UserService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      console.log(id);
      this.service.deleteUser(id).subscribe(res => {
        if (res.statusText === 'OK') {
          document.getElementById('message').innerText = 'This User Deleted!';
        } else {
          document.getElementById('message').innerText = 'This User Is Not Exist!';
        }
      }, error => {
        console.log('error');
        }, () => {
        $('#deletedStatus').modal();
      } );
    });
  }
}
