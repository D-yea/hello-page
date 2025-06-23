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
  const confirmLogout = confirm('Are you sure you want to logout?');
  if (confirmLogout)
   sessionStorage.removeItem('username');
   this.router.navigate(['/login']);
  }

  
 
  
  
  

  selectedOption : string = '' ;
  options: string[]=['enabled', 'disabled'];

  items: any[] =[];
displayedColumns: string[] = ['userId', 'userName','userEmail','userContactNo','actions',];



onStatusChange() {
    this.isSearchActive = false;
    this.searchUserId = '';        
  this.userData = [];  

  const selected = this.form.get('selectedOption')?.value;

  console.log('Dropdown changed:', selected);
  if (!selected) return;

  const status = selected === 'enabled' ? 1 : 0;

  // const url = `http://localhost:28781/v1/check/getStatus?userStatus=${status}`;
  const url='https://mocki.io/v1/18b93b6f-f7d9-4815-a4e6-549f30f9a515';
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


  showCreateUserForm = false;
  onSubmit(form: any) {
    if (!form.valid) {
       
    alert('Please fill all required fields correctly.');
    return;
  }

  const url =`http://localhost:28781/v1/check`;
      const token = sessionStorage.getItem('authToken');

      const headers = token
    ? new HttpHeaders({ Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json' })
    : new HttpHeaders({ 'Content-Type': 'application/json' });

      
      const body = {
    userId:form.value.userId,
    userName: form.value.userName,
    userEmail: form.value.userEmail,
    userContactNo: form.value.userContactNo,
    userPassword: form.value.userPassword,
    userType: form.value.userType || "0",
    userExpiryDate: null,
    userNoExpiry: false,
    userStatus: form.value.userStatus,
    userLastLogin: null,
    userGroupId: form.value.userGroupId || "1",
    activeDirectoryUser: false,
    superUser: false,
    accountLocked: false,
    lastUnSucessfulAttempt: null,
    passwordPolicy: null,
    groupPickingProfile: null
  };

  console.log('Sending POST to:', url);
  console.log('Request body:', body);
  console.log('Auth header:', headers.get('Authorization'));

  this.http.post(url, body, { headers }).subscribe({
    next: (response) => {
      console.log('User created:', response);
      alert('User created successfully!');
      this.onStatusChange(); 
      form.resetForm();
      this.showCreateUserForm = false;
     },
     error: (error) => {
    console.error('Error response:', error);
    alert('Error creating user: ' + (error.error?.message || 'Unknown error'));
  }
    });

}
showDeleteForm = false;
deleteRow(Id: number) {
  const confirmDelete = confirm(`Are you sure you want to delete user with ID ${Id}?`);
  if (!confirmDelete) return;

  const url = `http://localhost:28781/v1/check/${Id}`;
  const token = sessionStorage.getItem('authToken');

  const headers = token
    ? new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'lang': 'en'
        
      })
    : new HttpHeaders({
        'Content-Type': 'application/json',
        'lang': 'en'
      });

  this.http.delete(url, { headers }).subscribe({
    next: () => {
      alert(`User '${Id}' deleted successfully.`);
      this.onStatusChange(); 
    },
    error: (err) => {
      console.error('Delete failed:', err);
      alert('Failed to delete user.');
    }
  });
}


updateUser: any= {};
showUpdateUserForm = false;
changePassword: boolean = false;


editUser(user: any) {
   console.log('Edit user triggered', user);
  this.updateUser = {
    ...user,
    userEmail: user.userEmail || '',
    userContactNo: user.userContactNo || '',
    userType: user.userType || 0,
    userPassword: '', 
    userGroupId: user.userGroupId || 1,
    userStatus: user.userStatus ?? true
  };
  this.changePassword = false; 
  this.showUpdateUserForm = true;
}
 


onUpdate(form: any) {
  if (!form.valid) {
    alert('Please fill all required fields correctly.');
    return;
  }

  const url = `http://localhost:28781/v1/check`; 
  const token = sessionStorage.getItem('authToken');

  const headers = token
    ? new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        lang: 'en'
      })
    : new HttpHeaders({
        'Content-Type': 'application/json',
        lang: 'en'
      });

  const body = {
  id: this.updateUser.id,
  userId: this.updateUser.userId,
  userName: this.updateUser.userName,
  userEmail: this.updateUser.userEmail,
  userContactNo: this.updateUser.userContactNo,
  userType: this.updateUser.userType,
  userGroupId: this.updateUser.userGroupId || 1,
  userStatus: this.updateUser.userStatus ?? true,
  userPassword: this.updateUser.userPassword,
  userNoExpiry: true,
  userExpiryDate: null
  };

  if (this.changePassword) {
  body.userPassword = this.updateUser.userPassword;
}

  this.http.put(url, body, { headers }).subscribe({
    next: (res) => {
      alert('User updated successfully!');
      this.showUpdateUserForm = false;
      this.onStatusChange(); 
    },
    error: (err) => {
      console.error('Update failed:', err);
      alert('Failed to update user.');
    }
  });
}


isSearchActive: boolean = false;

searchUserId: string = '';
 public userData: Response[] = [];
searchByUserId() {
  if (!this.searchUserId) {
    alert('Please enter an ID to search.');
    return;
  }
  this.isSearchActive = true;
  const url = `http://localhost:28781/v1/check/getuserid?userId=${this.searchUserId}`;
  const token = sessionStorage.getItem('authToken');

  const headers = token
    ? new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        lang: 'en'
      })
    : new HttpHeaders({
        'Content-Type': 'application/json',
        lang: 'en'
      });

 this.http.get<Response[]>(url, { headers }).subscribe({
  next: (response) => {
    this.userData = response;
    console.log('User data:', response);
  },
  error: (err) => {
    console.error('Error fetching user by ID:', err);
  }
});

}

clearSearch() {
  this.isSearchActive = false;
  this.searchUserId = '';
  this.items = [];
}




}


