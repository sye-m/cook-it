import { LoggedInGuard } from './services/logged-in-guard.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegLogComponent } from './reg-log/reg-log.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [
  {
    path:'',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
  path: 'user',
  component: RegLogComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[LoggedInGuard]
  }
  
   ];
  
@NgModule({
  declarations: [
   
    AppComponent,
    RegLogComponent,
    HomeComponent
  ],
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
