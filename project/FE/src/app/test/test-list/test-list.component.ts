import {Component, OnInit} from '@angular/core';
import {TestService} from '../test_service/test.service';
import {Test} from '../test';
import {Message} from '../message';


@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {
  listTest: Test[];
  listTestDelete: number[] = [];
  messageFormBe: Message;
  message: string;

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
    if (event.target.value !== '') {
      this.testService.upload(event.target.files.item(0)).subscribe(
        mess => this.messageFormBe = mess,
        e => console.log(e),
        () => {
          this.getAllTest();
          this.showMessage('message', this.messageFormBe.message);
        }
      );
    }
  }

  chooseToDelete(testId: number): void {
    if (this.listTestDelete.includes(testId)) {
      this.listTestDelete.splice(this.listTestDelete.indexOf(testId), 1);
    } else {
      this.listTestDelete.push(testId);
    }
  }

  deleteTests(): void {
    this.testService.deleteTests(this.listTestDelete).subscribe(
      () => null,
      () => null,
      () => {
        this.getAllTest();
        this.listTestDelete = [];
      }
    );
  }

  showMessage(id: string, mess: string): void {
    this.message = mess;
    document.getElementById(id).hidden = false;

    setTimeout(() => this.hideMessage(id), 5000);
  }

  hideMessage(id): void {
    document.getElementById(id).hidden = true;
  }
}
