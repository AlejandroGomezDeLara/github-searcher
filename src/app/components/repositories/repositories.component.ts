import { Component, Input, OnInit } from '@angular/core';
import { Repository } from 'src/app/models/repository.model';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  @Input() repositories:Repository[]=[];

  public orderByStarsToggle:boolean=false;
  public orderAlphabeticallyToggle:boolean=false;

  constructor() { }

  ngOnInit(): void {
    
  }

  public toggleAlphabetically():void{
    this.orderAlphabeticallyToggle=!this.orderAlphabeticallyToggle;

    if(this.orderAlphabeticallyToggle){
      //Orden ascendente
      this.repositories.sort((a, b) => {
        if(a.name > b.name) {
          return 1;
        } else if(a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      });

    }else{
      //Orden descendente
      this.repositories.sort((a, b) => {
        if(a.name < b.name) {
          return 1;
        } else if(a.name > b.name) {
          return -1;
        } else {
          return 0;
        }
      });
    } 
  }

  public toggleOrderByStars():void{
    this.orderByStarsToggle=!this.orderByStarsToggle;

    if(this.orderByStarsToggle){
      //Orden ascendente
      this.repositories.sort((a, b) => {
        return a.stargazers_count - b.stargazers_count;
      });
    }else{
      //Orden descendente
      this.repositories.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
      });
    } 
  }
}
