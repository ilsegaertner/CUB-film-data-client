# Name: CUB Film data (client-side)

## An arthouse movies database

![image](https://raw.githubusercontent.com/ilsegaertner/parallelogram/main/img/_C__Users_Joachim_Desktop_CF_exercises_Fullstack%2520Immersion_exercises_parallelogram_index.html_.png)

### A complete web application (client-side and server-side) built using full-stack JavaScript technologies

### The project demonstrates mastery of full-stack JavaScript development, including APIs, web server frameworks, databases, business logic, authentication and data security

### Overview

CUB Film Data is an app built as part of my CareerFoundry's Full-Stack-Web-Development-Course to demonstrate the mastery of full-stack JavaScript development inside the MERN stack.

The web app allows users to load information about specific arthouse movies, directors, and genres. Users are able to create an account, update their personal data, create a list of favorite movies or delete their account.

The API is published on [GitHub](https://github.com/ilsegaertner/CUB_Film_data).

To visit App, click [here](https://cub-film-data.netlify.app/).

### Objective

The objectiv was to build a client-side REACT app for the previously developed [server-side API, the databases and the business logic](https://github.com/ilsegaertner/CUB_Film_data).

### Approach

**Client-Side:**

The development of the clientside was achieved through the usage of the REACT framework.
During the process the routes for the individual endpoints were determined, and the codelogic was created in different components, a main view, a navigation-bar, a movie view, a login- and signup view, a movie card, a profile view, and a favorites view:

### Features

#### Main view

- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

#### Single Movie view

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

#### Login view

- Allows users to log in with a username and password

#### Signup view

- Allows new users to register (username, password, email, date of birth)

#### Profile view

- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

### Challenges

The implementation of the client-side for the app took me way longer than any other previous project, and especially longer than the backend programming of the app.

As being new to Javascript and React relying on robust underrstanding of Javascript, I learned both (again) in the course of this project, going back and forth of old and new concepts. I was challenged with grasping the concepts of hooks, state and props.

As a conclusion it was not an easy, but very enriching task being aware of all the advantages that come in knowing how to creat REACT projects from scratch.

### Technologies used

- JavaScript
- Node.js
- Mongoose
- Express
- React
- MongoDB
