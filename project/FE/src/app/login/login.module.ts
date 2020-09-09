import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { MemberComponent } from './components/member/member.component';

@NgModule({
  declarations: [AuthLoginComponent, AdminComponent, MemberComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthLoginComponent
  ]
})
export class LoginModule { }
