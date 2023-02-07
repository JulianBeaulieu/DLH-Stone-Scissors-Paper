package com.sspbackend.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor
public class AppUser implements Serializable{
    private String username;
    private String password;
    private List<Game> games;
    private int score;

    public AppUser(String newUsername, String newPassword){
        username = newUsername;
        password = newPassword;
        games = new ArrayList<>();
        score = 0;
    }

    public void addGame(Game game){
        games.add(game);
    
        if(game.getOutcome() == 1){
            score += 2;
        } else if(game.getOutcome() == 0) {
            score += 1;
        }
    }

    public void addGame(String playerChoice, String computerChoice, int outcome){
        Game game = new Game(playerChoice, computerChoice, outcome);
        games.add(game);
    
        if(game.getOutcome() == 1){
            score += 2;
        } else if(game.getOutcome() == 0) {
            score += 1;
        }
    }
}
