import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tech-stack',
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.scss']
})
export class TechStackComponent implements OnInit {

  @Input() fullpage_api?: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
