# CUB Film data (Client-side): An Arthouse Movies Database

<img width="1434" alt="Bildschirmfoto 2023-10-12 um 15 12 35" src="https://raw.githubusercontent.com/ilsegaertner/CUB-film-data-client/alt-version-autumn-2024-context/src/assets/documentation/cub_film_data_screenshot1.png">

CUB Film Data is a comprehensive web application, encompassing both client-side and server-side components, crafted using full-stack JavaScript technologies. This project serves as a testament to mastering full-stack JavaScript development within the MERN stack, showcasing proficiency in APIs, web server frameworks, databases, business logic, authentication, and data security.

### Overview

CUB Film Data is an app built as part of my CareerFoundry's Full-Stack-Web-Development-Course to demonstrate the mastery of full-stack JavaScript development inside the MERN stack.

The web app allows users to load information about specific arthouse movies, directors, and genres. Users are able to create an account, update their personal data, create a list of favorite movies or delete their account.

The API is published on [GitHub](https://github.com/ilsegaertner/CUB_Film_data).

Access the hosted application[here](https://cub-film-data.netlify.app/).

### Objective

The objectiv was to build a client-side REACT application for the previously developed [server-side API, the databases and the business logic](https://github.com/ilsegaertner/CUB_Film_data).

### Approach

**Client-Side:**

The development of the clientside was achieved through the usage of the REACT framework.
During the process the routes for the individual endpoints were determined, and the codelogic was created in different components, a main view, a navigation-bar, a movie view, a login- and signup view, a movie card, a profile view, and a favorites view:

<img width="1423" alt="screenshot2" src="https://raw.githubusercontent.com/ilsegaertner/CUB-film-data-client/alt-version-autumn-2024-context/src/assets/documentation/cub_film_data_screenshot7.png">

### Features

#### Main view

- Displays all movies with pertinent details such as image, title, and description
- Facilitates easy filtering of movies through a search feature
- Enables users to view detailed information about each movie
- Provides options for logging out and navigating to the Profile view

#### Single Movie view

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add movies to their list of favorites

#### Login view

- Enables users to securely log in using their username and password

#### Signup view

- Allows new users to register (username, password, email, date of birth)

#### Profile view

- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

<img width="612" alt="Bildschirmfoto 2023-10-12 um 15 20 50" src="https://raw.githubusercontent.com/ilsegaertner/CUB-film-data-client/alt-version-autumn-2024-context/src/assets/documentation/cub_film_data_screenshot2.png"><img width="612" alt="Bildschirmfoto 2023-10-12 um 15 21 05" src="https://raw.githubusercontent.com/ilsegaertner/CUB-film-data-client/alt-version-autumn-2024-context/src/assets/documentation/cub_film_data_screenshot5.png">

### Challenges

The client-side implementation presented unique challenges and required a significant time investment compared to previous projects, particularly the backend programming of the API.

As being new to Javascript and React relying on robust underrstanding of Javascript, I learned both (again) in the course of this project, going back and forth of old and new concepts. I was challenged with grasping the concepts of hooks, state and props.

The process of learning REACT was enriching being aware of all the advantages that come with manouvering inside of REACT.

### Technologies used

- JavaScript
- REACT
- MongoDB
- Express
- HTML
- CSS
