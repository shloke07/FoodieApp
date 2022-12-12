import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Admin } from '../model/admin';
import { AdminService } from '../service/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouriteService } from '../service/favourite.service';
import { AuthService } from '../Guarding/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fav:FavouriteService, private userService: UserService, private adminService : AdminService, 
    private router : Router, private snackBar : MatSnackBar,private authService:AuthService) 
  { 

  }

  ngOnInit(): void {
  }
  admin:Admin[] = [];

  emailId='';
  data:any;

  userForm = new FormGroup({
    "emailId" : new FormControl('',[Validators.required,Validators.email]),
    "password" : new FormControl('',[Validators.required]),
    "role" :new FormControl('this.data.userRole')
  });

  responseData : any;
  loginCheck()
  {
    this.userService.loginCheck(this.userForm.value).subscribe(
      response => {
        this.responseData = response;
        this.adminService.emailId = this.userForm.value.emailId;
        localStorage.setItem('mailId',this.userForm.value.emailId!);
        this.fav.emailId = this.userForm.value.emailId;
        this.adminService.getUserDetails().subscribe(
          res =>{
            this.data = res;
            this.adminService.role = this.data.userRole;
            this.adminService.emailId = this.data.emailId;
            if(this.data.userRole === "ADMIN")
            {
              this.router.navigate(['admin']);
            }
            else
            {
              this.router.navigate(['user']);
            }
          }
        )
        localStorage.setItem('jwt',this.responseData.token);
        this.snackBar.open("Logged in successful", "Close", {duration:2000});
        this.authService.isUserLoggedIn=true;

      },
      (error=>{this.snackBar.open("Invalid Email/Password", "Dismiss", {duration:2000});})
      )
  }
  get emailid()
  {
    return this.userForm.get('emailId');
  }

  get Password()
  {
    return this.userForm.get('password');
  }
}


