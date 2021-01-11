import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  childComponent : string;

  constructor() { }

  ngOnInit(): void {
  }

  componentAdded(childComponent){
      this.childComponent = childComponent.constructor.name;
  } 

}
