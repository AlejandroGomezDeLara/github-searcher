import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { Repository } from 'src/app/models/repository.model';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  @Input() repositories?:Repository[]=[];
  @Output() onFilter = new EventEmitter<Repository[]>();
  @Input() languages?:string[]=[];
  public selectedLanguages:string[]=[];
  public filteredRepositories?:Repository[]=[];
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.form = this.initForm();
  }

  public initForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]],
    });
  }

  public filterRepositories():void{
    this.filteredRepositories=this.repositories?.filter(x=>x.name?.includes(this.form.value.name));
    //Una vez asignados, filtramos por lenguaje si hay lenguajes seleccionados
    if(this.selectedLanguages.length<=0 && this.filteredRepositories)
      this.sentEvent(this.filteredRepositories);
    else
      this.sentEvent(this.filterReposByLanguages());
  }

  public sentEvent(repositories:Repository[]):void{
    this.onFilter.emit(repositories);      
  }
  
  /* Evento para mostrar de nuevo todos los repositorios al borrar */
  public onDelete():void{
    if(this.form.value.name == ''){
      if(this.repositories) 
        this.sentEvent(this.repositories);  
    }
  }

  /* Filtramos por language y enviamos el evento*/
  public onCheckChange(event:any):void{
    let language=event.target.value;
    if(event.target.checked){
      if(!this.selectedLanguages?.some(x=>x==language))
        this.selectedLanguages.push(language);
    }else{
      if(this.selectedLanguages?.some(x=>x==language))
        this.selectedLanguages=this.selectedLanguages.filter(x=>x!=language);
    }
  }

  public filterReposByLanguages():Repository[]{
    let filteredRepositories:Repository[]=[];
    if(this.selectedLanguages){
      for(let language of this.selectedLanguages){
        if(this.filteredRepositories?.some(x=>x.language==language)){ 
          console.log(this.filteredRepositories.filter(x=>x.language==language));
          filteredRepositories.push(...this.filteredRepositories.filter(x=>x.language==language));
        }
      }
    }
    
    return filteredRepositories;
  }

}
