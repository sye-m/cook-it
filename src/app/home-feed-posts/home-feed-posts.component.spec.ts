import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeedPostsComponent } from './home-feed-posts.component';

describe('HomeFeedPostsComponent', () => {
  let component: HomeFeedPostsComponent;
  let fixture: ComponentFixture<HomeFeedPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFeedPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFeedPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
