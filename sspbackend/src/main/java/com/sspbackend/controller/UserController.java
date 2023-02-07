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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.sspbackend.model.Leader;
import com.sspbackend.model.AppUser;
import com.sspbackend.service.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@CrossOrigin()
@RestController
@RequestMapping({  })
public class UserController {
	private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }	

	@CrossOrigin("*")
    @GetMapping("/retrieveUser")
    public Leader getPlayGame(@RequestParam String username){
		log.info("USER: " + username);
		if(username != null){
			AppUser temp = userService.getUser(username);
			return new Leader(temp.getUsername(), temp.getScore());
		}
		return null;
	}	

	@CrossOrigin("*")
    @GetMapping("/allUsers")
    public List<AppUser> getPlayGame(){
		return userService.getAllUsers();
	}	

	@PostMapping("/createUser")
	public boolean createUser(@RequestParam String username, @RequestParam String password) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String encodedPassword = passwordEncoder.encode(password);

		log.info("NEW USER: " + username + " | " + encodedPassword);
		return this.userService.createNewUser(new AppUser(username, encodedPassword));
	}
}