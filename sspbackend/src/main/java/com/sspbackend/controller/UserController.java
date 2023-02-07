package com.sspbackend.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sspbackend.model.Employee;
import com.sspbackend.model.Game;
import com.sspbackend.model.Leader;
import com.sspbackend.model.AppUser;
import com.sspbackend.service.UserService;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@CrossOrigin()
@RestController
@RequestMapping({  })
public class UserController {
	private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

	@GetMapping(path = "/leaderboard", produces = "application/json")
	public List<Leader> leaderboard() {
		return userService.getLeaderboard();
	}

	@GetMapping(path = "/user", produces = "application/json")
	public Leader getUser(@RequestParam String username) {
		AppUser temp = userService.getUser(username);
		return new Leader(temp.getUsername(), temp.getScore());
	}	

	@GetMapping("/users")
	public void create(@RequestBody AppUser user) {
		this.userService.createNewUser(user);;
	}
}