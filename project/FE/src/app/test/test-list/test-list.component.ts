import {Component, OnInit} from '@angular/core';
import {TestService} from '../test_service/test.service';
import {Test} from '../test';


@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  listTest: Array<Test>;
  listTestDelete: number[] = [];

  constructor(private testService: TestService) {
  }

  ngOnInit(): void {
    this.getAllTest();
  }

  getAllTest(): void {
    this.testService.getAllTest().subscribe(
      list => {
        this.listTest = list;
      }
    );
  }

  selectFile(event): void {
    this.testService.upload(event.target.files.item(0)).subscribe();
  }

  chooseToDelete(testId: number): void {
    if (this.listTestDelete.includes(testId)) {
      this.listTestDelete.splice(this.listTestDelete.indexOf(testId), 1);
    } else {
      this.listTestDelete.push(testId);
    }
    console.log(this.listTestDelete);
  }

  deleteTests(): void {
    this.testService.deleteTests(this.listTestDelete).subscribe(
      () => null,
      () => null,
      () => this.getAllTest()
    );
  }
}
