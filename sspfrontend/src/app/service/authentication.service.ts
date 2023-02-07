import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User{
  constructor(
    public status:string,
     ) {}
  
}

const saltRounds = 10;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  encryptedPassword:string;

  constructor(
    private httpClient:HttpClient
  ) { }

  ngOnInit() {
    this.encryptedPassword = "";
  }

  authenticate(username, password) { 
    return this.httpClient.post<any>('http://localhost:8080/authenticate',{username, password}).pipe(
      map(
        userData => {
          sessionStorage.setItem('username',username);
          let tokenStr= 'Bearer '+ userData.token;
          sessionStorage.setItem('token', tokenStr);
          return userData;
        }
      )
      );
  }
  

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}