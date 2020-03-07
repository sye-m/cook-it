import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { AuthService } from './services/auth.service';
import { LoggedInGuard } from './services/logged-in-guard.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';

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
import { UserSearchComponent } from './user-search/user-search.component';
import { UserViewComponent } from './user-view/user-view.component';
import { NotificationsComponent } from './notifications/notifications.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full',
  },
  {
  path: 'user',
  component: RegLogComponent,
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[LoggedInGuard],
    children:[
      {
        path:'explore',
        component:ExploreComponent,
        outlet:'navnav',
      },
      
      {
        path:'profile',
        component:ProfileComponent,
        outlet:'navnav',

      },
      {
        path:'post',
        component:PostComponent,
        outlet:'navnav',

      },
      {
        path:'search/:searchTerm',
        component:SearchComponent,
        outlet:'navnav'
      },
      {
        path:'user-view',
        component:UserViewComponent,
        outlet:'navnav'
      },
      {
        path:'notifications',
        component:NotificationsComponent,
        outlet:'navnav'
      }
      
    ]}
    
  
  
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
    UserViewComponent,
    NotificationsComponent
  ],
  imports: [
    MatButtonModule,
    MatInputModule,
    MatSidenavModule,
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
  providers: [AuthService,PostService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
