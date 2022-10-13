import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }
  getUser(name: string): Observable<User> {
    const url = `https://api.github.com/users/${name}`;
    return this.http.get<User>(url);
  }

  getRepositories(name: string): Observable<User> {
    const url = `https://api.github.com/users/${name}/repos?page=1&per_page=1000`;
    return this.http.get<User>(url);
  }

  getUserAndRepositories(name:string):Observable<any>{
    const userUrl=`https://api.github.com/users/${name}`;
    const repositoriesUrl=`https://api.github.com/users/${name}/repos?page=1&per_page=1000`;

   return this.http.get(userUrl).pipe(
      switchMap(user => this.http.get(repositoriesUrl).pipe(
        map(repositories => ({ repositories:repositories, user })),
      )),
    );
  }
}
