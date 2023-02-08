package com.sspbackend.controller;

import java.util.Random;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sspbackend.model.Game;
import com.sspbackend.service.UserService;

import lombok.extern.slf4j.Slf4j;


@RestController
@Slf4j
@CrossOrigin()
@RequestMapping({ "game" })
public class GameController {
    private UserService userService;

    public static final String SCISSOR = "scissor";
    public static final String STONE = "stone";
    public static final String PAPER = "paper";

    public GameController(UserService userService){
        this.userService = userService;
    }
    
    @CrossOrigin("*")
    @GetMapping("/playGame")
    public Game getPlayGame(@RequestParam String username, @RequestParam String playerChoice){
        log.info("Playing new game. User chose: " + playerChoice);
        String[] options = {STONE, SCISSOR, PAPER};
        Random rand = new Random();
        String computerChoice = options[rand.nextInt(options.length)];
        log.info("Computer chose: " + computerChoice);

        int outcome = -100;

        if(playerChoice.equals(computerChoice)){
            outcome = 1;
        } else if(  (playerChoice.equals(STONE)    && computerChoice.equals(SCISSOR)) ||
                    (playerChoice.equals(SCISSOR) && computerChoice.equals(PAPER))    ||
                    (playerChoice.equals(PAPER)    && computerChoice.equals(STONE))   ){
            outcome = 2;
        } else {
            outcome = 0;
        }

        log.info("Outcome of the game: " + outcome + "\n\n");
        Game tempGame = new Game(playerChoice, computerChoice, outcome, -1);
        int newScore = this.userService.updateUserScore(username, tempGame);
        tempGame.setNewUserScore(newScore);

        return tempGame;
    }

    @CrossOrigin("*")
    @GetMapping("/playGameAnonymous")
    public Game playGame(@RequestParam String playerChoice){
        log.info("Playing new game. User chose: " + playerChoice);
        String[] options = {STONE, SCISSOR, PAPER};
        Random rand = new Random();
        String computerChoice = options[rand.nextInt(options.length)];
        log.info("Computer chose: " + computerChoice);

        int outcome = -100;

        if(playerChoice.equals(computerChoice)){
            outcome = 1;
        } else if(  (playerChoice.equals(STONE)    && computerChoice.equals(SCISSOR)) ||
                    (playerChoice.equals(SCISSOR) && computerChoice.equals(PAPER))    ||
                    (playerChoice.equals(PAPER)    && computerChoice.equals(STONE))   ){
            outcome = 2;
        } else {
            outcome = 0;
        }

        log.info("Outcome of the game: " + outcome + "\n\n");

        return new Game(playerChoice, computerChoice, outcome, -1);
    }
}
