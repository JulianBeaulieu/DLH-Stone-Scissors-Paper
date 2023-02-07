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
          return userData;
         }
       )
      );
  }

  public getUser(username) {    
    const headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

    return this.httpClient.get<any>('http://localhost:8080/retrieveUser?username=' + username ,{headers}).pipe(
       map(
         data => {
          return new User(data['username'], data['score']);
         }
       )
      );
  }

  public playGame(username, choice:string) {
    const headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

    return this.httpClient.get<any>('http://localhost:8080/game/playGame?username=' + username +'&playerChoice='+ choice,{headers}).pipe(
       map(
         data => {
          return new Game(data['userChoice'], data['computerChoice'], data['outcome'], data['newUserScore']);
         }
       )
      );

    // return this.httpClient.get<Game>('http://localhost:8080/game/playGame?playerChoice='+ encodeURIComponent( JSON.stringify(choice)),{headers});
  }

  public playGameAnonymous(choice:string) {
    const headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

    return this.httpClient.get<any>('http://localhost:8080/game/playGameAnonymous?playerChoice='+ choice,{headers}).pipe(
       map(
         data => {
          return new Game(data['userChoice'], data['computerChoice'], data['outcome'], data['newUserScore']);
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