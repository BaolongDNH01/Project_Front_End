import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from '../subject';
import {TestService} from '../test_service/test.service';
import {Test} from '../test';
import {JwtService} from '../../login/services/jwt.service';
import {Router} from '@angular/router';
import {Message} from '../message';


@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  formAddTest: FormGroup;
  listSubject: Array<Subject>;
  test: Test;
  roles: string[];
  messageFormBe: Message;
  message: string;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private testService: TestService, private jwt: JwtService) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0) {
      router.navigateByUrl('**');
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER') {
        router.navigateByUrl('**');
        return;
      }
    });
  }

  ngOnInit(): void {
    this.validateTest();
  }

  validateTest(): void {
    this.testService.getAllSubject().subscribe(list => this.listSubject = list);
    this.formAddTest = this.formBuilder.group({
      id: [],
      testName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9#_/*&]{1,50}$')]],
      subjectId: ['', [Validators.required]],
      grade: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,20}$')]],
      testCode: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,3}$')]]
    });
  }

  addTest(): void {
    this.test = this.formAddTest.value;
    console.log(this.test);
    this.testService.addTest(this.test).subscribe(
      mess => {
        this.messageFormBe = mess;
        this.message = this.messageFormBe.message;
      },
      () => null,
      () => {
        this.showMessage('message', this.message);
      }
    );
  }

  showMessage(id: string, mess: string): void {
    this.message = mess;

    setTimeout(() => this.hideMessage(id), 7000);
  }

  hideMessage(id): void {
    this.message = null;
  }
}
