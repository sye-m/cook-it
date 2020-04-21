import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';
import { LoggedInGuard } from './services/logged-in-guard.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegLogComponent } from './reg-log/reg-log.component';
import { HomeComponent } from './home/home.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { ProfileComponent } from './profile/profile.component';
import { ExploreComponent } from './explore/explore.component';
import { PostComponent } from './post/post.component';
import { InfiniteScrollComponent } from './infinite-scroll/infinite-scroll.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { SearchComponent } from './search/search.component';
import { MatCardModule } from '@angular/material/card';
import { UserSearchComponent } from './user-search/user-search.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { HomeFeedPostsComponent } from './home-feed-posts/home-feed-posts.component';
import { PostViewComponent } from './post-view/post-view.component';
import { HomeFeedPostsViewComponent } from './home-feed-posts-view/home-feed-posts-view.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { MessagesComponent } from './messages/messages.component';
import { MessagesViewComponent } from './messages-view/messages-view.component';
import { FollowersViewComponent } from './followers-view/followers-view.component';
import { FollowingViewComponent } from './following-view/following-view.component';
import { UsersToFollowComponent } from './users-to-follow/users-to-follow.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'user',
    component: RegLogComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard],
    children: [
      {
        path: '',
        component: HomeFeedPostsComponent,
      },
      {
        path: 'explore',
        component: ExploreComponent,
      },

      {
        path: 'profile/:user_id',
        component: ProfileComponent,
      },
      {
        path: 'editProfile',
        component: EditProfileComponent,
      },
      {
        path: 'post',
        component: PostComponent,

      },
      {
        path: 'search/:searchTerm',
        component: SearchComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      
      {
        path: 'messages',
        component: MessagesComponent,
      },
      {
        path: 'm/:user_id',
        component: MessagesViewComponent,
      },
      {
        path: 'p/:post_id',
        component: PostViewComponent,
      },
      {
        path: 'editPost/:post_id',
        component: EditPostComponent,
      },
      {
        path: 'following/:user_id',
        component: FollowingViewComponent,
      },
      {
        path: 'followers/:user_id',
        component: FollowersViewComponent,
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    RegLogComponent,
    HomeComponent,
    ProfileComponent,
    ExploreComponent,
    PostComponent,
    InfiniteScrollComponent,
    SinglePostComponent,
    SearchComponent,
    UserSearchComponent,
    NotificationsComponent,
    HomeFeedPostsComponent,
    PostViewComponent,
    HomeFeedPostsViewComponent,
    EditProfileComponent,
    EditPostComponent,
    MessagesComponent,
    MessagesViewComponent,
    FollowersViewComponent,
    FollowingViewComponent,
    UsersToFollowComponent
  ],
  imports: [
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    FlashMessagesModule.forRoot()
  ],
  exports: [RouterModule],
  providers: [AuthService, PostService, UserService,ChatService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
