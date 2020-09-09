import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {UserService} from '../user_service/user.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  public array: any;
  public dataSource: any;
  public pageSize = 10;
  public currentPage = 0;
  public totalSize = 0;
  // MatPaginator Output
  pageEvent: PageEvent;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getArray();
  }

  // tslint:disable-next-line:typedef
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.pageEvent.pageIndex = this.currentPage;
    this.pageEvent.pageSize = this.pageSize;
    this.iterator();
    return this.pageEvent;
  }

  // tslint:disable-next-line:typedef
  private getArray() {
    this.userService.findAllUser()
      .subscribe((response) => {
        this.dataSource = new MatTableDataSource(response);
        this.dataSource.paginator = this.paginator;
        this.array = response;
        this.totalSize = this.array.length;
        this.iterator();
      });
  }

  // tslint:disable-next-line:typedef
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    this.dataSource = this.array.slice(start, end);
  }
}
