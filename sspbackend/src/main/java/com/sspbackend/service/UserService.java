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
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserService implements UserDetailsService{
    private Database db;

    public UserService(){
        db = new Database();
    }

    @Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.debug(username);
		if (username == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
		} else {
            AppUser tempUser = db.getUser(username);
            db.getUser(username);
			return new User(tempUser.getUsername(), tempUser.getPassword(), new ArrayList<>());
		}
	}

    public AppUser getUser(String username){
        return db.getUser(username);
    }

    public List<AppUser> getAllUsers(){
        return db.getAllUsers();
    }

    public int updateUserScore(String username, Game game){
       return db.addGameToUser(username, game);
    }

    public List<Leader> getLeaderboard(){
        return db.getLeaderboard();
    }

    public boolean userExists(String username){
        return db.doesUserExist(username);
    }

    public boolean createNewUser(String username, String password){
        if(!userExists(username)){
            db.setUser(username, new AppUser(username, password));
            return true;
        } else {
            return false;
        }
    }

    public boolean createNewUser(AppUser user){
        if(!userExists(user.getUsername())){
            db.setUser(user.getUsername(), user);
            return true;
        } else {
            return false;
        }
    }
}
