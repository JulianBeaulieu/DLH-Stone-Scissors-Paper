import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/httpclient.service';

export class Game{
  constructor(
    public userChoice:string,
    public computerChoice:string,
    public outcome:string,
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
    this.httpClientService.playGame(choice).subscribe(
      response =>console.log(response),
     );
  }

  handleSuccessfulUserResponse(response:User){
      this.user=response;
      console.log("New Score: ", this.user.score);
      
  }

  handleSuccessfulGameResponse(response:Game){
      this.game=response;
      this.updateUser();
  }

  ngOnInit() {
    const rightFist = document.getElementById('rightFist');
    const leftFist = document.getElementById('leftFist');
    const stoneButton = document.getElementById('stone');
    const scissorButton = document.getElementById('scissor');
    const paperButton = document.getElementById('paper');
    var active = false;
    let rightIterationCount = 0;
    let leftIterationCount = 0;

    rightFist.addEventListener('animationstart', () => {
      console.log('rightFist animation started');
    });

    leftFist.addEventListener('animationstart', () => {
      console.log('leftFist animation started');
    });

    rightFist.addEventListener('animationend', () => {
      console.log('rightFist animation ended');
      rightFist.classList.remove('active');
    });

    leftFist.addEventListener('animationend', () => {
      console.log('leftFist animation ended');
      leftFist.classList.remove('active');
    });

    stoneButton.addEventListener('click', () => {
      if(!active){
        console.log(rightFist.classList);
        console.log(leftFist.classList);
        
        rightFist.classList.add('active');
        leftFist.classList.add('active');

        rightIterationCount = 0;
        leftIterationCount = 0;

        stoneButton.classList.toggle("active");
        this.playGame("stone");
        console.log("Game Results: ", this.game);
        stoneButton.classList.toggle("active");
      }
    });

    scissorButton.addEventListener('click', () => {
      if(!active){
        console.log(rightFist.classList);
        console.log(leftFist.classList);
        
        rightFist.classList.add('active');
        leftFist.classList.add('active');

        rightIterationCount = 0;
        leftIterationCount = 0;

        scissorButton.classList.toggle("active");
        this.playGame("scissor");
        console.log("Game Results: ", this.game);
        scissorButton.classList.toggle("active");
      }
    });

    paperButton.addEventListener('click', () => {
      if(!active){
        console.log(rightFist.classList);
        console.log(leftFist.classList);
        
        rightFist.classList.add('active');
        leftFist.classList.add('active');

        rightIterationCount = 0;
        leftIterationCount = 0;

        paperButton.classList.toggle("active");
        this.playGame("paper")
        console.log("Game Results: ", this.game);
        paperButton.classList.toggle("active");
      }
    });
  }
}
