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
  active = false;
  rightFist:HTMLElement;
  leftFist:HTMLElement;
  stoneButton:HTMLElement;
  scissorButton:HTMLElement;
  paperButton:HTMLElement;
  rightIterationCount:number;
  leftIterationCount:number;

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

  addButtonEventListener(domElement, playType, interactionType){
    domElement.addEventListener(interactionType, () => {
      if(!this.active){
        this.active = this.active ? false : true;
        
        this.rightFist.classList.add('active');
        this.leftFist.classList.add('active');

        this.rightIterationCount = 0;
        this.leftIterationCount = 0;

        domElement.classList.toggle("active");
        this.playGame(playType);
        domElement.classList.toggle("active");
        this.active = this.active ? false : true;
      }
    });
  }

  ngOnInit() {
    this.user = new User(sessionStorage.getItem('username'), "0");
    this.updateUser();

    this.active = false;
    this.rightFist = document.getElementById('rightFist');
    this.leftFist = document.getElementById('leftFist');
    this.stoneButton = document.getElementById('stone');
    this.scissorButton = document.getElementById('scissor');
    this.paperButton = document.getElementById('paper');
    this.rightIterationCount = 0;
    this.leftIterationCount = 0;
    

    this.rightFist.addEventListener('animationstart', () => {
      // console.log('rightFist animation started');
    });

    this.leftFist.addEventListener('animationstart', () => {
      // console.log('leftFist animation started');
    });

    this.rightFist.addEventListener('animationend', () => {
      this.rightFist.classList.remove('active');
    });

    this.leftFist.addEventListener('animationend', () => {
      this.leftFist.classList.remove('active');
    });

    this.addButtonEventListener(this.stoneButton, "stone", 'click');
    this.addButtonEventListener(this.stoneButton, "stone", 'tap');
    this.addButtonEventListener(this.scissorButton, "scissor", 'click');
    this.addButtonEventListener(this.scissorButton, "scissor", 'tap');
    this.addButtonEventListener(this.paperButton, "paper", 'click');
    this.addButtonEventListener(this.paperButton, "paper", 'tap');
  }
}
