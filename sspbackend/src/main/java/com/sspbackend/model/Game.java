package com.sspbackend.model;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@NoArgsConstructor 
@AllArgsConstructor
public class Game implements Serializable{
    private String userChoice;
    private String computerChoice;
    private int outcome;
}
