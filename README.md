# Welcome to Myflix Client

Application is the server side component of a the MyFlix application. The Web application provides users with access to the information about 
different movies, directors, genres using a secure interface. Users can sign up, login and save their favorite movies on a list that is unique to them. 

<img width="1148" alt="myflixreact" src="https://user-images.githubusercontent.com/44932790/158056742-9b2fc4e1-a6dc-443c-b54b-d7a923228fb8.png">


## User Stories 

* As a user, I want to be able to receive information on movies, directors, and genres so that I
can learn more about movies I’ve watched or am interested in.
* As a user, I want to be able to create a profile so I can save data about my favorite movies

## Instructions for use

1. Simply open the application here 
2. Sign up 
3. Login and browse Movies
4. To View a movie click on the Open button
5. To Add to favorites click on the favorites button 
6. Click on Remove button to remove favorites from the list

## Key Features

* Return a list of ALL movies to the user
* Return data (description, genre, director, image URL, whether it’s featured or not) about a
  single movie by title to the user 
* Return data about a genre (description) by name/title (e.g., “Thriller”)
* Return data about a director (bio, birth year, death year) by name
* Allow new users to register
* Allow users to update their user info (username, password, email, date of birth)
* Allow users to add a movie to their list of favorites
* Allow users to remove a movie from their list of favorites
* Allow existing users to deregister

## Technologies Used

* Api is a Node.js and Express Application
* JWT token based authorization
* API uses REST architechture 
* User Morgan for logging
* DB is built using MongoDB
* Business Logic is modeled using Mongoose
* API provides movie information in JSON format
* API tested using PostMan
* API hosted on Heroku 
