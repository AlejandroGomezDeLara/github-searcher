import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { GithubService } from './services/github.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { RepositoriesComponent } from './components/repositories/repositories.component';
import { UserSearchbarComponent } from './components/user-searchbar/user-searchbar.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    SearchbarComponent,
    RepositoriesComponent,
    UserSearchbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
