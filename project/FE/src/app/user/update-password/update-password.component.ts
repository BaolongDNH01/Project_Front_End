import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user_service/user.service';
import {Router} from '@angular/router';
import {JwtService} from "../../login/services/jwt.service";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit {

  passwordEditForm: FormGroup;
  userId: number;
  // currentPassword: string;
  newPassword: string;
  // confirmNewPassword: string;
  isWrongPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.passwordEditForm = this.formBuilder.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [''],
      confirmNewPassword: [''],
      wrongPassword: false
    });
  }

  changePassword() {
    if (this.passwordEditForm.valid) {
      this.userId = this.jwtService.getUser().id;
      this.userService.changePassword(this.userId, this.passwordEditForm.value).subscribe(() => {
        this.router.navigateByUrl('detail-user/' + this.userId);
      }, () => {
        this.isWrongPassword = true;
      });
    }
  }

}
