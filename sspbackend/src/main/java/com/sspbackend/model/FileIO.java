package com.sspbackend.model;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Scanner;
import java.util.StringTokenizer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map.Entry;

/**
 * @Author Julian Beaulieu
 * @git julianbeaulieu
 * @filename FileIO.java
 * @description This class is used to transfer data from and to files
 */
public class FileIO {
  private static final String BINARYFILEMATRIXFILEPATH = "resources/db.dat";

  public static HashMap<String, User> loadDB()
  {
    File binaryDataFile = new File(BINARYFILEMATRIXFILEPATH);

    if(binaryDataFile.exists())
    {
      return loadDataFromBinaryFile(BINARYFILEMATRIXFILEPATH);
    }
    else
    {
      return new HashMap<String, User>();
    }
  }

  /** This method loads the Graph from a binary file
   *
   * @return An array of LinkedLists containing the Edges which are the vertices of the graph
   */
  private static HashMap<String, User> loadDataFromBinaryFile(String filePath)
  {
    Data data = null;

    try
    {
      //tries to open file
      ObjectInputStream fileIo = new ObjectInputStream(new FileInputStream(filePath));

      //Loads a matrix object from the file
      data = (Data) fileIo.readObject();

      fileIo.close();
    }
    catch(IOException e)
    {
      //e.printStackTrace();

      //in the case that the file is somehow corrupted, it will try to load the graph from the binary file
      return new HashMap<String, User>();
    }
    catch(ClassNotFoundException e)
    {
      //e.printStackTrace();

      //in the case that the file is somehow corrupted, it will try to load the graph from the binary file
      return new HashMap<String, User>();
    }

    //returns the graph which the matrix object holds
    return data.getData();
  }

  /*####################################################################*/
  /*########################## File Output #############################*/
  /*####################################################################*/

  public static void saveData(HashMap<String, User> data)
  {
    File myObj = new File("db.dat"); 
    if (myObj.delete()) { 
      System.out.println("Deleted the file: " + myObj.getName());
    } else {
      System.out.println("Failed to delete the file.");
    } 
    
    try
    {
      //tries to make a file
      ObjectOutputStream fileOutput = new ObjectOutputStream(new FileOutputStream(BINARYFILEMATRIXFILEPATH));
      
      Data temp = new Data(data);
      //saves a matrix object to the file
      fileOutput.writeObject(temp);

      fileOutput.close();
    }
    catch(IOException e)
    {
      e.printStackTrace();
    }
  }

  /*####################################################################*/
  /*########################## InnerClass ##############################*/
  /*####################################################################*/

  @NoArgsConstructor 
  @AllArgsConstructor
  private static class Data implements Serializable {
    private HashMap<String, User> data = null;

    public HashMap<String, User> getData() {
      return data;
    }

    public void setData(HashMap<String, User> data) {
      this.data = data;
    }
  }

}

