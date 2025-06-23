import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';  

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  loggedIn = false;
  errorMessage = '';
  Username: string = '';
  showPassword: boolean = false;

  constructor(private auth: Auth, private router: Router) {}
  
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;

  }
  
  
  onSubmit(form: any): void {
    console.log('onSubmit()triggered');
    if (!form.valid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }


  console.log('Form data:', form.value);

    const givenUsername = form.value.Username;
  const Username = givenUsername.toUpperCase();
    const password = form.value.password;  
   
    this.auth.login(Username, password, ).subscribe({
      next: (response) => {
      
        this.loggedIn = true;
        this.errorMessage = '';
        
        sessionStorage.setItem('username', Username );
        const token = response.accessToken; 

    if (token) {
            sessionStorage.setItem('authToken', token);
            }else 
              {
            console.error('No token found in login response');
}



        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = err.error.message;
        this.loggedIn = false;
      }
    });
  }

  
}
