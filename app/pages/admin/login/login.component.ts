import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    userName: '',
    password: ''
  };
  constructor(private router: Router){}

  onLogin() {
    if (this.loginObj.userName === 'admin' && this.loginObj.password === '336699') {
      sessionStorage.setItem('isAdmin', 'true');
      sessionStorage.removeItem('bigBasket_user');
      console.log('Admin login successful');
      this.router.navigate(['/products']);
    } 
     else {
      alert('Wrong Credentials');
    }
  }

}