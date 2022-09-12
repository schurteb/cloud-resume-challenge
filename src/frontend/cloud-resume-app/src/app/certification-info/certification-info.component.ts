import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-certification-info',
  templateUrl: './certification-info.component.html',
  styleUrls: ['./certification-info.component.scss']
})
export class CertificationInfoComponent implements OnInit {

  @Input() fullpage_api?: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
