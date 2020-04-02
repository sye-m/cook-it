import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowingViewComponent } from './following-view.component';

describe('FollowingViewComponent', () => {
  let component: FollowingViewComponent;
  let fixture: ComponentFixture<FollowingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
