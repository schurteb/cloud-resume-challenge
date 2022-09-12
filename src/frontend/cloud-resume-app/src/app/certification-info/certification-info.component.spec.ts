import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationInfoComponent } from './certification-info.component';

describe('CertificationInfoComponent', () => {
  let component: CertificationInfoComponent;
  let fixture: ComponentFixture<CertificationInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificationInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
