package com.sspbackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sspbackend.model.Leader;
import com.sspbackend.service.UserService;

@RestController
@CrossOrigin(origins = "localhost:8080", maxAge = 3600)
public class LeaderBoardController {
    private UserService userService;

    public LeaderBoardController(UserService userService){
        this.userService = userService;
    }

    @CrossOrigin("*")
    @GetMapping("/game/getLeaderboard")
    public List<Leader> getLeaderboard(){
        return userService.getLeaderboard();
    }
}
