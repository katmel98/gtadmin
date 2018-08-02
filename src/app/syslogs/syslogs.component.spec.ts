import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyslogsComponent } from './syslogs.component';

describe('SyslogsComponent', () => {
  let component: SyslogsComponent;
  let fixture: ComponentFixture<SyslogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyslogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyslogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
