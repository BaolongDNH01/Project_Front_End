import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestService} from './test_service/test.service';


import {HttpClientModule} from '@angular/common/http';
import { AddTestComponent } from './add-test/add-test.component';
import {ReactiveFormsModule} from '@angular/forms';
import { GetTestComponent } from './get-test/get-test.component';
import {TestListComponent} from './test-list/test-list.component';






@NgModule({
  declarations: [GetTestComponent, TestListComponent, AddTestComponent],

  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [
    TestListComponent,
    AddTestComponent
  ],
  providers: [TestService]
})
export class TestModule { }
