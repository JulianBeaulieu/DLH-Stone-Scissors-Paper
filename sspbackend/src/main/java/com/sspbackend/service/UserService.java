package com.sspbackend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sspbackend.model.Database;
import com.sspbackend.model.Leader;
import com.sspbackend.model.User;

@Service
public class UserService {
    private Database db;

    public UserService(){
        db = new Database();
    }

    public User getUser(String username){
        return db.getUser(username);
    }

    public List<Leader> getLeaderboard(){
        return db.getLeaderboard();
    }

    public boolean userExists(String username){
        return db.doesUserExist(username);
    }

    public void createNewUser(String username, String password){
        db.setUser(username, new User(username, password));
    }
}
