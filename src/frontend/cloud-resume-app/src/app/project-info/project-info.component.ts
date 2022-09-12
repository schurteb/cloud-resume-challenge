import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {

  @Input() fullpage_api?: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
