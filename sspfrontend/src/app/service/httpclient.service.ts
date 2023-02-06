import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export class User{
  constructor(
    public name:string,
    public score:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient:HttpClient
  ) { 
     }

     

     getUsers()
  {
    let username=''
    let password=''
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    
       return this.httpClient.get<User[]>('http://localhost:8080/users',{headers});
  }

  public deleteUser(user) {
    let username=''
    let password=''
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.delete<User>("http://localhost:8080/users" + "/"+ user.empId,{headers});
  }

  public createUser(user) {
    let username=''
    let password=''
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.post<User>("http://localhost:8080/users", user,{headers});
  }
}