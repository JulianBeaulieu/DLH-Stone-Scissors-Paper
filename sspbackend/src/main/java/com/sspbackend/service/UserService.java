package com.sspbackend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.sspbackend.model.Database;
import com.sspbackend.model.Game;
import com.sspbackend.model.Leader;
import com.sspbackend.model.AppUser;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService{
    private Database db;

    public UserService(){
        db = new Database();
    }

    @Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser tempUser = db.getUser(username);
        db.getUser(username);
		if ("root".equals(username)) {
			return new User(tempUser.getUsername(), tempUser.getPassword(), new ArrayList<>());
		} else {
			throw new UsernameNotFoundException("User not found with username: " + username);
		}
	}

    public AppUser getUser(String username){
        return db.getUser(username);
    }

    public void updateUserScore(String username, Game game){
        db.addGameToUser(username, game);
    }

    public List<Leader> getLeaderboard(){
        return db.getLeaderboard();
    }

    public boolean userExists(String username){
        return db.doesUserExist(username);
    }

    public void createNewUser(String username, String password){
        db.setUser(username, new AppUser(username, password));
    }

    public void createNewUser(AppUser user){
        db.setUser(user.getUsername(), user);
    }
}
