import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  invalidLogin:boolean;

  constructor(
    private router: Router,
    private loginservice: AuthenticationService
  ) { }

  ngOnInit() {
    this.username = "";
    this.password = "";
    this.invalidLogin = false;
  }

  checkLogin() {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        console.log("Success", this.username, this.password, data);
        this.router.navigate([''], { queryParams: { username: this.username } })
        this.invalidLogin = false;
      },
      error => {
        console.log("Failure", this.username, this.password, error);
        this.invalidLogin = true;

      }
    )
    );
  }

}