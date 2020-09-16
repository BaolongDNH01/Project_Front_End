import {Component, OnInit} from '@angular/core';
import {TestService} from '../test_service/test.service';
import {Test} from '../test';
import {Message} from '../message';
import {JwtService} from '../../login/services/jwt.service';
import {Router} from '@angular/router';


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
  roles: string[];
  constructor(private testService: TestService, private jwt: JwtService, private router: Router) {
    this.roles = jwt.getAuthorities();
    if (this.roles.length === 0){
      router.navigateByUrl('**');
    }
    this.roles.every(role => {
      if (role === 'ROLE_MEMBER'){
        router.navigateByUrl('**');
        return;
      }
    });
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
    if (this.listTestDelete.length > 0) {
      this.testService.deleteTests(this.listTestDelete).subscribe(
        () => null,
        () => null,
        () => {
          this.getAllTest();
          this.showMessage('message', 'delete # ' + this.listTestDelete.toString() + ' successful !');
          this.listTestDelete = [];
        }
      );
    }else {
      this.showMessage('message', 'please choose one to delete !');
    }
  }

  showMessage(id: string, mess: string): void {
    this.message = mess;

    setTimeout(() => this.hideMessage(id), 5000);
  }

  hideMessage(id): void {
    this.message = null;
  }
}
