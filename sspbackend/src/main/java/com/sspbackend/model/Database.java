package com.sspbackend.model;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

public class Database {
    private HashMap<String, User> database = null;

    public Database(){
        database = FileIO.loadDB();
    }

    public Database(HashMap<String, User> newDatabase){
        database = newDatabase;
    }

    public User getUser(String userName){
        return database.get(userName);
    }

    public List<Leader> getLeaderboard(){
        Collection getValues = database.values();
        Iterator i = getValues.iterator();
        List<Leader> leaderboard = new ArrayList<>();
        
        while (i.hasNext()) {
            User temp = (User) i.next();
            leaderboard.add(new Leader(temp.getUsername(), temp.getScore()));
        }

        Collections.sort(leaderboard);

        return leaderboard;
    }

    public void setUser(String userName, User newUser){
        database.put(userName, newUser);
        FileIO.saveData(database);
    }

    public boolean doesUserExist(String userName){
        return database.get(userName) != null;
    }

    public int getUserScore(String userName){
        return doesUserExist(userName) ? database.get(userName).getScore() : 0;
    }
}
