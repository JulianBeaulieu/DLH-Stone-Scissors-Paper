package com.sspbackend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor
public class Leader implements Comparable {
    private String username;
    private int score;

    @Override
    public int compareTo(Object arg0) {
        Leader temp = (Leader) arg0;

        if(score == temp.getScore()){
            return 0;
        } else if(score > temp.getScore()){
            return 1;
        } else {
            return -1;
        }
    }
}
