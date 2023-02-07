import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/httpclient.service';

export class Game{
  constructor(
    public userChoice:string,
    public computerChoice:string,
    public outcome:string,
    public newScore:string,
  ) {}
}

export class User{
  constructor(
    public name:string,
    public score:string,
  ) {}
}



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  user:User;
  game:Game;

  constructor(
    private httpClientService:HttpClientService
  ) { 
   
  }

  updateUser():void {
    this.httpClientService.getUser(this.user.name).subscribe(
      response =>this.handleSuccessfulUserResponse(response),
     );
  }

  playGame(choice:string):void {
    this.httpClientService.playGame(this.user.name, choice).subscribe(
      response => this.handleSuccessfulGameResponse(response),
     );
  }

  handleSuccessfulUserResponse(response:User){
      this.user=response;
  }

  handleSuccessfulGameResponse(response:Game){
      this.game=response;
      this.user.score = response.newScore;      
      this.updateUser();
  }

  ngOnInit() {
    this.user = new User(sessionStorage.getItem('username'), "0");
    this.updateUser();
    const rightFist = document.getElementById('rightFist');
    const leftFist = document.getElementById('leftFist');
    const stoneButton = document.getElementById('stone');
    const scissorButton = document.getElementById('scissor');
    const paperButton = document.getElementById('paper');
    var active = false;
    let rightIterationCount = 0;
    let leftIterationCount = 0;

    rightFist.addEventListener('animationstart', () => {
      // console.log('rightFist animation started');
    });

    leftFist.addEventListener('animationstart', () => {
      // console.log('leftFist animation started');
    });

    rightFist.addEventListener('animationend', () => {
      rightFist.classList.remove('active');
    });

    leftFist.addEventListener('animationend', () => {
      leftFist.classList.remove('active');
    });

    stoneButton.addEventListener('click', () => {
      if(!active){
        active = active ? false : true;
        
        rightFist.classList.add('active');
        leftFist.classList.add('active');

        rightIterationCount = 0;
        leftIterationCount = 0;

        stoneButton.classList.toggle("active");
        this.playGame("stone");
        stoneButton.classList.toggle("active");
        active = active ? false : true;
      }
    });

    scissorButton.addEventListener('click', () => {
      if(!active){
        active = active ? false : true;
        
        rightFist.classList.add('active');
        leftFist.classList.add('active');

        rightIterationCount = 0;
        leftIterationCount = 0;

        scissorButton.classList.toggle("active");
        this.playGame("scissor");
        scissorButton.classList.toggle("active");
        active = active ? false : true;
      }
    });

    paperButton.addEventListener('click', () => {
      if(!active){
        active = active ? false : true;
        
        rightFist.classList.add('active');
        leftFist.classList.add('active');

        rightIterationCount = 0;
        leftIterationCount = 0;

        paperButton.classList.toggle("active");
        this.playGame("paper")
        paperButton.classList.toggle("active");
        active = active ? false : true;
      }
    });
  }
}
