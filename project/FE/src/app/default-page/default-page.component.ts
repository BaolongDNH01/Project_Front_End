import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.css']
})
export class DefaultPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  scrollTo(id: string): void {
    const elmnt = document.getElementById(id);
    elmnt.scrollIntoView();
  }
}
