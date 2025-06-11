import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {

   private username:string=" ";
  set Username(name:string){
    this.Username= name;}
    get Username(): string{
      return this.Username;
    }
  
  }

