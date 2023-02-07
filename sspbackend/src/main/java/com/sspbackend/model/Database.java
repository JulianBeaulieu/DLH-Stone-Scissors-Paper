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
    private HashMap<String, AppUser> database = null;

    public Database(){
        database = FileIO.loadDB();
    }

    public Database(HashMap<String, AppUser> newDatabase){
        database = newDatabase;
    }

    public AppUser getUser(String userName){
        return database.get(userName);
    }

    public List<Leader> getLeaderboard(){
        Collection getValues = database.values();
        Iterator i = getValues.iterator();
        List<Leader> leaderboard = new ArrayList<>();
        
        while (i.hasNext()) {
            AppUser temp = (AppUser) i.next();
            leaderboard.add(new Leader(temp.getUsername(), temp.getScore()));
        }

        Collections.sort(leaderboard);

        return leaderboard;
    }

    public void setUser(String userName, AppUser newUser){
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
