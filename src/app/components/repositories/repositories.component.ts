import { Component, Input, OnInit } from '@angular/core';
import { Repository } from 'src/app/models/repository.model';

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.scss']
})
export class RepositoriesComponent implements OnInit {

  @Input() repositories?:Repository[]=[];

  constructor() { }

  ngOnInit(): void {
    
  }

  public onScroll(event:any):void{
    console.log(event);
    
  }

}
