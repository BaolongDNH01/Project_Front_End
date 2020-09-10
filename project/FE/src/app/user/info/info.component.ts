
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import {User} from "../user_model/User";
import {AuthService} from "../../login/services/auth.service";
import {UserService} from "../user_service/user.service";
import {Password} from "../update-password/password";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  user: User;
  infoFormInput: FormGroup;
  passwordFormInput: FormGroup;
  message = '';
  updatedInfoSuccess = false;
  changedPasswordSuccess = false;
  submitted = false;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.infoFormInput = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.passwordFormInput = this.formBuilder.group(
      {
        oldPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.checkPassword }
    );
    this.loadUser();
  }

  checkPassword(form: FormGroup) {
    const oldPassword = form.get('oldPassword').value;
    const newPassword = form.get('newPassword').value;
    const confirmPassword = form.get('confirmPassword').value;
    let result;
    if (oldPassword === newPassword) {
      result = { dupPass: true };
    } else if (newPassword !== confirmPassword) {
      result = { ...result, notSame: true };
    } else {
      result = true;
    }
    return result;
  }

  loadUser(): void {
    this.authService.user$
      .pipe(
        tap((user) =>
          this.infoFormInput.patchValue({
            name: user?.fullName,
            address: user?.address,
            phoneNumber: user?.phoneNumber,
            email: user?.email,
          })
        )
      )
      .subscribe((user) => {
        this.user = user;
      });
    this.authService.getCurrentUser();
  }

  handleChangeInfo() {
    if (this.infoFormInput.valid) {
      this.user.fullName = this.infoFormInput.value.name;
      this.user.address = this.infoFormInput.value.address;
      this.user.phoneNumber = this.infoFormInput.value.phoneNumber;
      this.user.email = this.infoFormInput.value.email;
      this.userService.editUser(this.user).subscribe(() => {
        this.loadUser();
        this.updatedInfoSuccess = true;
        this.message = 'Success!';
      });
      setInterval(() => {
        this.updatedInfoSuccess = false;
      }, 5000);
    }
  }

  handleChangePassword() {
    if (this.passwordFormInput.valid) {
      const password: Password = {
        currentPassword: this.passwordFormInput.value.oldPassword,
        newPassword: this.passwordFormInput.value.newPassword,
        confirmNewPassword: this.passwordFormInput.value.confirmPassword,
      };
      this.userService.changePassword(this.user.id, password).subscribe(
        () => {
          this.changedPasswordSuccess = true;
          this.message = 'Success!';
          this.passwordFormInput.reset();
        },
        () => {
          this.submitted = true;
          this.message = 'Current password not correct!';
        }
      );
      setInterval(() => {
        this.changedPasswordSuccess = false;
        this.submitted = false;
      }, 5000);
    }
  }
}
