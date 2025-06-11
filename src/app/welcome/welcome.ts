import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  Username: string = '';
//get user from session
username  = sessionStorage.getItem('username');
  // constructor(private userService: User) {
  //   this.username = this.userService.Username;  //get user from browser session
  // }

}
