import {Component, OnInit} from '@angular/core';
import {TestService} from '../../test/test_service/test.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Test} from '../../test/test';

@Component({
  selector: 'app-pick-test',
  templateUrl: './pick-test.component.html',
  styleUrls: ['./pick-test.component.css']
})
export class PickTestComponent implements OnInit {
  p = 0;
  listTest: Test[];

  constructor(private testService: TestService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const subjectName = paramMap.get('subjectName');
      this.testService.getTestBySubject(subjectName).subscribe(next => {
        this.listTest = next;
      });
    });
  }

  ngOnInit(): void {
  }

}
