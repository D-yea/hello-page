import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {

   private username:string=" ";
  set Username(name:string){
    this.username= name;}
    get Username(): string{
      return this.username;
    }
  
  }

