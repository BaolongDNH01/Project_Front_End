import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestService} from './test_service/test.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [TestService]
})
export class TestModule { }
