import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
dropdownSelected = 'Member List';
  constructor() { }

  ngOnInit(): void {
  }

  menuChange(selected: string){
    this.dropdownSelected = selected;
  }
}
