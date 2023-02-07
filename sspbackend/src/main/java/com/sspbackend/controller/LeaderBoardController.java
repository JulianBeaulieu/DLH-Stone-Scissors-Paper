package com.sspbackend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sspbackend.model.Leader;
import com.sspbackend.service.UserService;

@RestController
@CrossOrigin()
public class LeaderBoardController {
    private UserService userService;

    public LeaderBoardController(UserService userService){
        this.userService = userService;
    }

    @CrossOrigin("*")
    @GetMapping(path = "/leaderboard", produces = "application/json")
	public List<Leader> leaderboard() {
		return userService.getLeaderboard();
	}
}
