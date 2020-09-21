import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user_model/User';
import {UserService} from '../user_service/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-edit-user-by-admin',
  templateUrl: './edit-user-by-admin.component.html',
  styleUrls: ['./edit-user-by-admin.component.css']
})

export class EditUserByAdminComponent implements OnInit {
  editForm: FormGroup;
  editUser: User;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.editForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(25)]],
      fullName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['',
        [
          Validators.required,
          Validators.maxLength(55),
          Validators.pattern(/^[a-zA-Z0-9_]*@[a-zA-Z0-9_]*\.[a-zA-Z]{3}$/)
        ]
      ],
      address: ['', [Validators.required, Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(15)]]
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const username = paramMap.get('username');
      this.userService.getUserByUsername(username).subscribe(next => {
        this.editUser = next;
      }, error => {
        console.log('Error');
      }, () => {
        this.editForm = this.formBuilder.group({
            username: [this.editUser.username, [Validators.required, Validators.maxLength(25)]],
            fullName: [this.editUser.fullName, [Validators.required, Validators.maxLength(50)]],
            email: [this.editUser.email,
              [
                Validators.required,
                Validators.maxLength(55),
                Validators.pattern(/^[a-zA-Z0-9_]*@[a-zA-Z0-9_]*\.[a-zA-Z]{3}$/)
              ]
            ],
            address: [this.editUser.address, [Validators.required, Validators.maxLength(255)]],
            phoneNumber: [this.editUser.phoneNumber, [Validators.required, Validators.maxLength(15)]]
          }
        );
      });
    });

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('abc');
    if (this.editForm.valid) {
      const c = this.editForm.value;
      console.log(c);
      this.editUser = {
        id: this.editUser.id,
        username: c.username,
        userPassword: null,
        fullName: c.fullName,
        email: c.email,
        address: c.address,
        phoneNumber: c.phoneNumber,
        avatar: this.editUser.avatar,
        examList: null
      };
      this.userService.adminEditUser(this.editUser).subscribe(res => {
        if (res.statusText === 'OK') {
          document.getElementById('message').innerText = 'Edit Successfully';
          $('#modalSuccess').modal();
        }
      }, error => {
        console.log(error);
        document.getElementById('message').innerText = 'Username already exist';
        $('#modalSuccess').modal();
      }, )
      ;
    }
  }
}
