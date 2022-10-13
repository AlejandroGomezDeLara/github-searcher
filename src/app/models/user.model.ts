import { Repository } from "./repository.model";

export class User {
  login?: string;
  followers?:number;
  html_url?:string;
  avatar_url?: string;
  created_at?: string;
  location?: string;
  bio?: string;
  public_repos?: string;
  public_gists?: string;
  languages?:string[];
  repositories?:Repository[]
}