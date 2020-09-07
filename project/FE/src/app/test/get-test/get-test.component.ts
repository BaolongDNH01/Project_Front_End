import {Component, OnInit} from '@angular/core';
import {Test} from '../test';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TestService} from '../test_service/test.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-get-test',
  templateUrl: './get-test.component.html',
  styleUrls: ['./get-test.component.css']
})
export class GetTestComponent implements OnInit {
  test: Test;
  testForm: FormGroup;

  constructor(private fb: FormBuilder, private testService: TestService, private router: Router) {
  }

  ngOnInit(): void {

  }

}
