import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';

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
  username: string = '';

  constructor(private userService: User, private router: Router) {}

  onSubmit(form: any): void {
    if (!form.valid) {
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const username = form.value.Username;
    this.userService.Username = username;
    this.loggedIn = true;
    this.errorMessage = '';
    this.router.navigate(['/welcome']);
  }
}



