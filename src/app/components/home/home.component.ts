import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GithubService } from '../../services/github.service';
import { User } from '../../models/user.model';
import { Repository } from 'src/app/models/repository.model';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  repositories?:Repository[];
  filteredRepositories!:Repository[];
  user?:User;

  constructor() { }


  public ngOnInit(): void {
      
  }  

  public filterRespositories(repositories:Repository[]):void{
    this.filteredRepositories=[...repositories];
  }

  public setUser(user:User):void{
    this.user=user;
    if(user){
      this.repositories=user.repositories;
      if(user.repositories)
        this.filteredRepositories=user.repositories;
    }
  }

  public setUserNotFound(){
    this.user=undefined;  
  }


}
