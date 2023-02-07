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

    public GameController(UserService userService){
        this.userService = userService;
    }
    
    @CrossOrigin("*")
    @GetMapping("/playGame")
    public Game getPlayGame(@RequestParam String playerChoice){
        log.info("Playing new game. User chose: " + playerChoice);
        String[] options = {"stone", "scissors", "paper"};
        Random rand = new Random();
        String computerChoice = options[rand.nextInt(options.length)];
        log.info("Computer chose: " + computerChoice);

        int outcome = -100;

        if(playerChoice.equals(computerChoice)){
            outcome = 0;
        } else if(  (playerChoice.equals("stone")    && computerChoice.equals("scissors")) ||
                    (playerChoice.equals("scissors") && computerChoice.equals("paper"))    ||
                    (playerChoice.equals("paper")    && computerChoice.equals("stone"))   ){
            outcome = 1;
        } else {
            outcome = -1;
        }

        log.info("Outcome of the game: " + outcome + "\n\n");

        return new Game(playerChoice, computerChoice, outcome);
    }
}
