import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-employment-history',
  templateUrl: './employment-history.component.html',
  styleUrls: ['./employment-history.component.scss']
})
export class EmploymentHistoryComponent implements OnInit {

  @Input() fullpage_api?: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
