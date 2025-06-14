import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl,FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup } from '@angular/forms';




@Component({
  selector: 'app-welcome',
  standalone: true,
   imports: [CommonModule,FormsModule,MatTableModule,MatSelectModule,MatFormFieldModule,ReactiveFormsModule],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class Welcome implements OnInit {
   form!: FormGroup; 
  Username: string = '';
  
//get user from session
username  = sessionStorage.getItem('username');
  // constructor(private userService: User) {
  //   this.username = this.userService.Username;  //get user from browser session
  // }
  
selectedOptionControl = new FormControl('');

   
 constructor (private router: Router , private http:HttpClient,private fb: FormBuilder){} 
  ngOnInit(): void {
    this.form= this.fb.group({
      selectedOption: ['']
    });
  }
 
 logout(){
   sessionStorage.removeItem('username');
   this.router.navigate(['/login']);
  }

  

  
  
  
  selectedOption : string = '' ;
  options: string[]=['enabled', 'disabled'];

  items: any[] =[];

//   onStatusChange(){
//     console.log('Dropdown changed:', this.selectedOption);
//     if(!this.selectedOption)return;
    
//     let status;
//     if(this.selectedOption== 'enabled'){
//       status=1;
//       }
//     else{
//       status=0;
//         }
    
//   const url= `http://localhost:28781/v1/check/getStatus?userStatus=${status}`;
    
//     const token= sessionStorage.getItem('authToken');
//   const headers = token? new HttpHeaders({'Authorization': `Bearer ${token}`}): new HttpHeaders();


// console.log('Authorization header:', headers.get('Authorization'));
//     this.http.get<any[]>(url, { headers }).subscribe({
//       next: data => {
//         this.items = data;

//       },
//       error:(error) => {
//         console.error('Error fetching', error);
//       }
//     });
    
// }

onStatusChange() {
  const selected = this.form.get('selectedOption')?.value;

  console.log('Dropdown changed:', selected);
  if (!selected) return;

  const status = selected === 'enabled' ? 1 : 0;

  const url = `http://localhost:28781/v1/check/getStatus?userStatus=${status}`;
  const token = sessionStorage.getItem('authToken');
  const headers = token
    ? new HttpHeaders({ Authorization: `Bearer ${token}` })
    : new HttpHeaders();

  this.http.get<any[]>(url, { headers }).subscribe({
    next: data => {
      this.items = data;
    },
    error: error => {
      console.error('Error fetching', error);
    }
  });
}






displayedColumns: string[] = ['userId', 'userName','userEmail','userContactNo'];





}



 


