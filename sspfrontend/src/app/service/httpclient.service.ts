import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Game } from '../game/game.component';
import { map } from 'rxjs/operators';

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
  ) {}

     

  public getUsers() {
    const headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

    return this.httpClient.get<any>('http://localhost:8080/users',{headers}).pipe(
       map(
         userData => {
          console.log("\n\n\n\n\n", userData, "\n\n\n\n")
          return userData;
         }
       )
      );
  }

  public getUser(user) {
    const headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

    return this.httpClient.get<any>('http://localhost:8080/user?username=' + user.name ,{headers}).pipe(
       map(
         data => {
          console.log("\n\n\n\n\n", data, "\n\n\n\n");
          let u = new User(data['username'], data['score'])
          console.log(u);
          return u;
         }
       )
      );
  }

  public playGame(choice:string) {
    const headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

    return this.httpClient.get<any>('http://localhost:8080/game/playGame?playerChoice='+ choice,{headers}).pipe(
       map(
         data => {
          console.log("\n\n\n\n\n", data, "\n\n\n\n");
          let g = new Game(data['userChoice'], data['computerChoice'], data['outcome'])
          console.log(g);
          return g;
         }
       )
      );

    // return this.httpClient.get<Game>('http://localhost:8080/game/playGame?playerChoice='+ encodeURIComponent( JSON.stringify(choice)),{headers});
  }

  public createUser(user) {
    let username=''
    let password=''
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    return this.httpClient.post<User>("http://localhost:8080/users", user,{headers});
  }
}