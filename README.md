
# AVIATAR:

## Stone Scissors Paper

### Table of Contents:

0. Foreword

1. How to Execute Code

    a. Running the Spring Boot Backend

    b. Running the Angular Frontend

2. Further Questions & Assumptions

3. Resources Used
---

### 0. Foreword

I just quickly wanted to give you a heads-up that this was made and tested on macOS. Furthermore, this guide will be made for macOS. It should work on Windows, but running the code might be different.

Also, a username and password to test the app is ```username: Anita``` and ```password: password```.


---

### 1. How to Execute Code

#### a. Running the Spring Boot Backend

So to run the actual Spring Boot Backend Application you need to obviously need to have the [Java SDK](https://www.oracle.com/java/technologies/downloads/) installed. This is probably already installed, but if not then follow the guides on Java. To actually start the server, I would recommend you install something like IntelliJ, VSCode (which ever flavor you prefer), or other more advanced IDE. From there navigate to the ```Spring Boot Backend/src/main/java/com/sspbackend/SSPApplication.java``` application and run it. I would like to note, that for me it only really worked when I did not open up the entire repo in the IDE but only the Spring Boot Backend. You can also probably use the command line to start the Spring Boot Backend using a variation of the following command ```/usr/bin/env /Library/Java/JavaVirtualMachines/jdk-19.jdk/Contents/Home/bin/java @/var/folders/wz/w_q5sz1d653ckcz19k7xfjmm0000gn/T/cp_5c2t7rwvvpokctqflslxr8y8u.argfile com.sspbackend.SSPApplication``` (At least this is the command it used to start up the program for me). 

From here the Spring Boot Backend will listen on port 8080 on your computer for any incoming requests. Please make sure that both port 8080 and 4200 are free.

#### b. Running the Angular Frontend

Before you can run the Angular Frontend, you will need to install a bunch of dependencies. The best thing to do here is to go to [Angular](https://angular.io/guide/setup-local) and follow the guide on how to set it up. Once you have done that, simply ```cd``` into the Angular Frontend folder and enter the command ```ng serve```. If you are on a windows machine, you probably need to use VSCode or something similar to start it.

---

### 2. Further Questions & Assumptions

 - Logging, Metrics, etc?
	 - Let's start with the lowest hanging fruit. I used Slf4j to log things to the terminal. This worked very well for me. I left a couple of logs to show how the code is running, but most of the development logs are removed. 
     - What about logging metrics such as latency? I tried! No really, I did! So I set up a controller and an object to create CSV files in which I wanted to log the latency, which call was being made, which user it was, where the call was being made from, device etc. It did not work. I was hanging over it for about 2-3 hours and for some reasons the REST calls were not comming in, and at this point I needed to keep working on other things. I know there are libraries out there that can do a lot of what I wanted to do as well, but some require a SQL-ish database, and that would be too much for this usecase.
	 
 - What about user storage?
    - Great question! So I first spent about 1 day trying to get a beautiful solution to work using docker, PostgreSQL, and Spring Boot. I then wanted to
    add JWT as a security measure for user auth. Then I remembered that someone needs to run this and maybe actually want to look at the source code. May not have Docker installed, or know how docker works. Hell, I would probably have to publich the container on the docker cloud. It just got too much and I decided to refocus myself on the task at hand. The solution? I use a binary file which I constantly update. Is it a great solution? No. Does it work? Yes. This is why I went with this solution. Ideally, I would host a PostgreSQL server somewhere, and use that as data storage, then I could also nicely log and store usage data and metrics, but that is a bigger task, and I don't have the time for that.

 - What about tests?
    - So as you can see, there are some test fixtures in the Angular folder. I am not really well versed when it comes to frontend testing, besides maybe checking if a controller returns the correct thing. So I did not really look too much into testing for Angular. Concerning Java, tests were next on my list to do. I am running out of time, so I am going to leave them as a 'next on my list' thing if I have more time. I usually enjoy doing test driven development but I am still new to Spring Boot, so I was happy to just get it up and running. I did import the unit testing framework in Spring Boot because it truly is/was my next step.
	 
 - What are the assumptions you made?
	 - Great question. My assumption is that someone knows the basics on how to start a Spring Boot and Angular application. 
     - You are not expecting and SQL-flavored data store. (I really, really wanted too)
     - I can use tailwind.css
---

### 3. Resources Used

Before I just present you a list of resources, I would like to note that I strongly dislike reinventing the wheel. So if there is something that can make my life easier, I will try and use that. That being said, the skeletons for botht the Angular and Spring Boot Application are from the same source. I was hoping to save some time on setting up the JWT user auth, but the requests were all mangled up, and I had to spend some time, making sure that the requests actually arrived where they were supposed to go to. Much of the frontend work is my own, though I will say that I used the code of the spinning coin from someone else, link will also be there. 

- [Skeleton Tutorial](https://www.javainuse.com/spring/ang7-jwt)
    - [Angular Skeleton](https://github.com/JavaInUse/angular7-jwt)
    - [Spring Boot Skeleton](https://www.javainuse.com/zip/spring/boot/ang-spring-boot-jwt.rar)
- [Spinning Coin](https://codepen.io/augustinhiebel/pen/vYZQbGV)
- [ChatGPT](chat.openai.com)