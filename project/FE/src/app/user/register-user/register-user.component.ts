import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user_service/user.service';
import {Router} from '@angular/router';
import {User} from '../user_model/User';

// tslint:disable-next-line:typedef
export function ValidatePassword(abstract: AbstractControl, confirmPassword: string) {
  const v = abstract.value;
  return (v.user_password === confirmPassword) ? null : {
    passwordNotMatch: true
  };
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  newUser: User;
  confirmPassword: string;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = formBuilder.group({
        id: [''],
        username: ['', [Validators.required, Validators.maxLength(25)]],
        user_password: ['', [Validators.required, Validators.maxLength(16)]],
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
      }, {
        validators: ValidatePassword(this.registerForm, this.confirmPassword)
      }
    );
  }

  ngOnInit(): void {
  }

  register(): void {
    if (this.registerForm.valid){
      this.newUser = this.registerForm.value;
      this.userService.saveNewUser(this.newUser).subscribe(res => res.statusText);
    }
  }
}
