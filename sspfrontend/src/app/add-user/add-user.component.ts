import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { HttpClientService, User } from '../service/httpclient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  username = ''
  password = ''
  invalidLogin = false;

  constructor(
    private router: Router,
    private httpClientService: HttpClientService,
    private loginservice: AuthenticationService
  ) { }

  ngOnInit() {
  }

  createUser(): void {
    console.log();
    if(this.username.trim() != null || this.username.trim() != "" || 
        this.password.trim() != null || this.password.trim() != ""){
      
      console.log("Username & Password", this.username, this.password);
      this.httpClientService.createUser(this.username, this.password).subscribe( data => {
        (this.loginservice.authenticate(this.username, this.password).subscribe(
          data => {
            this.router.navigate([''])
            this.invalidLogin = false
          },
          error => {
            this.invalidLogin = true
    
          }
        ));
      });
    } else {
      console.log("Invalid Username or Password", this.username, this.password);
    }
  };
}