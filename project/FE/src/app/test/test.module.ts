import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestService} from './test_service/test.service';
import { GetTestComponent } from './get-test/get-test.component';


@NgModule({
  declarations: [GetTestComponent],
  imports: [
    CommonModule
  ],
  providers: [TestService]
})
export class TestModule { }
