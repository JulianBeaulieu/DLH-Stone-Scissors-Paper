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

const saltRounds = 10;

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient:HttpClient
  ) {}

  public getUsers() {
    const headers = new HttpHeaders().set('Authorization', sessionStorage.getItem('token'));

    return this.httpClient.get<any>('http://localhost:8080/leaderboard',{headers}).pipe(
       map(
         userData => {          
          let newUserArray = [];
          for (let i = 0; i < userData.length; i++) {
            newUserArray.push(new User(userData[i]['username'], userData[i]['score']));
          }
          return newUserArray;
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
  }

  public createUser(username:string, password:string) {
    const headers = new HttpHeaders();
    return this.httpClient.post<User>("http://localhost:8080/createUser?username=" + username + "&password=" + password,{headers});
  }
}