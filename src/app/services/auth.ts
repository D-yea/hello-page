import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  
//private apiUrl = 'https://acme-sd-srv01.acmeplus.co:38771/api/v1/auth/login'; 
private apiUrl = 'http://localhost:28781/v1/auth/login';
constructor(private http: HttpClient) {}
login(Username: string, password: string): Observable<any> {
    const body = {
      
      userName:window.btoa(Username),
      password : window.btoa(password),
      lang :"en"
    };
    return this.http.post<any>(this.apiUrl, body);
  }

}
