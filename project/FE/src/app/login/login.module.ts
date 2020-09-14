import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './components/admin/admin.component';
import { MemberComponent } from './components/member/member.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [AuthLoginComponent, AdminComponent, MemberComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule
    ],
  exports: [
    AuthLoginComponent
  ]
})
export class LoginModule { }
