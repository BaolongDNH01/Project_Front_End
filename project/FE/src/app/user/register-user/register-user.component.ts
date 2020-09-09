import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user_service/user.service';
import {Router} from '@angular/router';
import {User} from '../user_model/User';
import {ValidatePassword} from '../validator/validator';

declare var $: any;
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  passwordForm: FormGroup;
  registerForm: FormGroup;
  newUser: User;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.passwordForm = formBuilder.group({
      password: ['', [Validators.required, Validators.maxLength(16)]],
      confirm_password: new FormControl([''])
    }, {validators: ValidatePassword('password', 'confirm_password')});

    this.registerForm = formBuilder.group({
        username: ['', [Validators.required, Validators.maxLength(25)]],
        user_password: this.passwordForm,
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
      }
    );
  }

  // tslint:disable-next-line:typedef
  // ValidatePassword(abstract: AbstractControl) {
  //   const v = abstract.value;
  //   return (v.password !== v.confirm_password) ? {passwordnotmatch: true} : null;
  // }

  ngOnInit(): void {
    console.log(this.registerForm.value.user_password);
  }

  register(): void {
    if (this.registerForm.valid && this.passwordForm.valid) {
      const c = this.registerForm.value;
      this.newUser = {
        id: null,
        username: c.username,
        user_Password: this.passwordForm.value.password,
        fullName: c.fullName,
        email: c.email,
        address: c.address,
        phoneNumber: c.phoneNumber,
        avatar: null,
        examList: null
      };
      this.userService.saveNewUser(this.newUser).subscribe(res => {
        if (res.statusText === 'OK'){
          document.getElementById('message').innerText = 'Register Successfully';
          $('#modalSuccess').modal();
          setTimeout(() => {
            this.router.navigateByUrl('');
          }, 7000);
        }else {document.getElementById('message').innerText = 'Your username already exist';
               $('#modalSuccess').modal();}
      });
    }
  }
}
