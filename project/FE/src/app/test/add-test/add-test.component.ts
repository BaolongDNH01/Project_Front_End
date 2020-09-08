import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from '../subject';
import {TestService} from '../test_service/test.service';
import {Test} from '../test-model';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  formAddTest: FormGroup;
  listSubject: Array<Subject>;
  test: Test;

  constructor(private formBuilder: FormBuilder,
              private testService: TestService) {
  }

  ngOnInit(): void {
    this.validateTest();
  }

  validateTest(): void {
    this.testService.getAllSubject().subscribe(list => this.listSubject = list);
    this.formAddTest = this.formBuilder.group({
      id: [1],
      testName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#_/*&]{1,50}$')]],
      subjectId: ['', [Validators.required]],
      grade: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,20}$')]]
    });
  }

  addTest(): void {
    this.test = this.formAddTest.value;
    console.log(this.test);
    this.testService.addTest(this.test).subscribe(
      () => null,
      () => null,
      () => {
        console.log('add ok');
      }
    );
  }
}
