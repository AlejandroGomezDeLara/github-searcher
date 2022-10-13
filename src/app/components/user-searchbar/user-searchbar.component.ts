import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Repository } from 'src/app/models/repository.model';
import { User } from 'src/app/models/user.model';
import { GithubService } from 'src/app/services/github.service';

@Component({
  selector: 'app-user-searchbar',
  templateUrl: './user-searchbar.component.html',
  styleUrls: ['./user-searchbar.component.scss']
})
export class UserSearchbarComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  user?: User;
  @Output() onSearch = new EventEmitter<User>();
  @Output() onUserNotFound = new EventEmitter<void>();
  isLoading:boolean=false;
  searched:boolean=false;

  constructor(private formBuilder:FormBuilder,private githubService:GithubService) { }


  ngOnInit() {
    this.form = this.initForm();
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    });
  }

  public searchUserAndRepositories():void{
    this.onSearch.emit(undefined);
    this.isLoading=true;
    this.githubService.getUserAndRepositories(this.form.value.username).subscribe(res=>{
      this.user=res.user;
      if(this.user){
        this.user.repositories=res.repositories; 
        this.user.languages=this.setLanguages(res.repositories);
        this.onSearch.emit(res.user);
      }else{
        this.onUserNotFound.emit();
      }
      this.isLoading=false;
      this.searched=true;
    },error=>{
      this.isLoading=false;
      this.user=undefined;
      this.searched=true;
      this.onUserNotFound.emit();
    })
  }

  /* Asignamos los lenguajes de programación dinámicamente */
  public setLanguages(repositories:Repository[]):string[]{
    let languages:string[]=[];
    if(repositories != undefined){
      for(let repository of repositories){
        if(repository.language){
          if(!languages.some(x=>x==repository.language))
            languages.push(repository.language); 
        } 
      }
    }
    return languages;
  }
}
