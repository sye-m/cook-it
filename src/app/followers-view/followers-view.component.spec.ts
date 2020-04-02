import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowersViewComponent } from './followers-view.component';

describe('FollowersViewComponent', () => {
  let component: FollowersViewComponent;
  let fixture: ComponentFixture<FollowersViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowersViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
