import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserService} from './user_service/user.service';
import {RegisterUserComponent} from './register-user/register-user.component';
import {ListUserComponent} from './list-user/list-user.component';
import {DeleteUserComponent} from './delete-user/delete-user.component';
import {ReactiveFormsModule} from '@angular/forms';
import { StatisticalUserComponent } from './statistical-user/statistical-user.component';


@NgModule({
    declarations: [RegisterUserComponent,
        ListUserComponent,
        DeleteUserComponent,
        StatisticalUserComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    exports: [
        StatisticalUserComponent
    ],
    providers: [UserService]
})
export class UserModule {
}
