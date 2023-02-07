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

  users:User[];
  user:User;
  game:Game;
  active = false;
  rightFist:HTMLElement;
  leftFist:HTMLElement;
  rightFistEmoji:HTMLElement;
  leftFistEmoji:HTMLElement;
  stoneButton:HTMLElement;
  scissorButton:HTMLElement;
  paperButton:HTMLElement;
  rightIterationCount:number;
  leftIterationCount:number;
  showHowToModal:boolean;
  showLeaderboardModal:boolean;
  showWinnerModal:boolean;
  winnerMessage:string;
  alertMessage:string;

  constructor(
    private httpClientService:HttpClientService
  ) { 
   
  }

  ngOnInit() {
    this.user = new User(sessionStorage.getItem('username'), "0");
    this.users = [new User(sessionStorage.getItem('username'), "0")]
    this.updateUser();
    this.updateUsers();

    this.active = false;
    this.rightFist = document.getElementById('rightFist');
    this.leftFist = document.getElementById('leftFist');
    this.stoneButton = document.getElementById('stone');
    this.scissorButton = document.getElementById('scissor');
    this.paperButton = document.getElementById('paper');
    this.rightFistEmoji = document.getElementById('rightFistEmoji');
    this.leftFistEmoji = document.getElementById('leftFistEmoji');
    this.rightIterationCount = 0;
    this.leftIterationCount = 0;
    this.showLeaderboardModal = false;
    this.showWinnerModal = false;
    this.showHowToModal = false;
    this.winnerMessage = "Default Message";
    this.alertMessage = "Woop";

    this.rightFist.addEventListener('animationstart', () => {
      this.rightFistEmoji.innerText = this.textToEmoji("stone");
    });

    this.leftFist.addEventListener('animationstart', () => {
      this.leftFistEmoji.innerText = this.textToEmoji("stone");
    });

    this.rightFist.addEventListener('animationiteration', () => {
      this.rightIterationCount++;
    });

    this.leftFist.addEventListener('animationiteration', () => {
      this.leftIterationCount++;
    });

    this.rightFist.addEventListener('animationend', () => {
      this.rightFist.classList.remove('active');
      
      if(this.rightIterationCount == 2){
        this.rightFistEmoji.innerText = this.textToEmoji(this.game.userChoice);
      }
    });

    this.leftFist.addEventListener('animationend', () => {
      this.leftFist.classList.remove('active');
      
      if(this.leftIterationCount == 2){
        this.leftFistEmoji.innerText = this.textToEmoji(this.game.computerChoice);
        
        this.alertMessage = this.alertTextGenerator(this.game.outcome);  
        this.winnerMessage = this.gameOutcomeTextGenerator(this.game.outcome);        
        this.openWinnerModal();
        setTimeout(this.closWinnerModal, 1000); 
      }
    });

    this.addButtonEventListener(this.stoneButton, "stone", 'click');
    this.addButtonEventListener(this.stoneButton, "stone", 'tap');
    this.addButtonEventListener(this.scissorButton, "scissor", 'click');
    this.addButtonEventListener(this.scissorButton, "scissor", 'tap');
    this.addButtonEventListener(this.paperButton, "paper", 'click');
    this.addButtonEventListener(this.paperButton, "paper", 'tap');
  }

  updateUser():void {
    this.httpClientService.getUser(this.user.name).subscribe(
      response =>this.handleSuccessfulUserResponse(response),
     );
  }

  updateUsers():void {
    this.httpClientService.getUsers().subscribe(
      response =>this.handleSuccessfulUsersResponse(response),
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

  handleSuccessfulUsersResponse(response:User[]){
      this.users=response;
      this.users.sort((a, b) => {
        return parseInt(b.score) - parseInt(a.score);
      });
  }

  textToEmoji(selection){
    if(selection === "paper"){
      return "✋"
    } else if(selection === "scissor"){
      return "✌️"
    } else {
      return "✊"
    }
  }

  gameOutcomeTextGenerator(outcome){
    if(outcome == 2){
      return "You won !!! 🥳"
    } else if(outcome == 1) {
      return "You tied. 🫠"
    } else {
      return "Oh no, you lost! You'll get em next round!😔"
    }
  }

  alertTextGenerator(outcome){
    if(outcome == 2){
      return "WOOP!"
    } else if(outcome == 1) {
      return "HMMM"
    } else {
      return "AWW"
    }
  }

  handleSuccessfulGameResponse(response:Game){
    this.game=response;
    this.user.score = response.newScore;
    this.updateUser();
    this.updateUsers();
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

  openLeaderboardModal() {
    this.showLeaderboardModal = true;
  }

  closeLeaderboardModal() {
    this.showLeaderboardModal = false;
  }

  openHowToModal() {
    this.showHowToModal = true;
  }

  closeHowToModal() {
    this.showHowToModal = false;
  }

  openWinnerModal() {
    this.showWinnerModal = true;
  }

  closWinnerModal() {
    this.showWinnerModal = false;
  }

  
}
