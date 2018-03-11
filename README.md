Nightlife Coordination App
==============================

## Overview
This is a MERN stack web app based on the web application challenges at [FreeCodeCamp](https://www.freecodecamp.org/challenges/build-a-nightlife-coordination-app).

### User stories
- Users can search for bars in their area and see how many people are going to each (using the Yelp API)
- Authenticated users can view a list of the people going to each bar, and add/remove themselves from the list 

View the live version:  
<https://lb-nightlife-coordinator.herokuapp.com/>


## Getting started
### Prerequisites
You must have the following installed:
* [Node](https://nodejs.org/)
* [NPM](https://nodejs.org/)

### Installation & Startup
#### Clone the Github repo

``` 
$ git clone https://github.com/LauraBrandt/nightlife-coordinator.git 
```

#### Install dependencies

```
$ npm install 
```

#### Set environment variables
You will need to set three environment variables:

1. Database URI

 You can use [mongoDB locally](https://www.mongodb.com/download-center) if you have it installed, or an external database. I used [mLab](https://mlab.com/).
 
 ```
 MLAB_URI=<YOUR_DATABASE_URI>
 ```
 
2. JWT secret

 Can be anything you want.

 ```
 JWT_SECRET=<YOUR_SECRET>
 ```
 
3. Yelp API key

 You will have to [register your app with Yelp Fusion](https://www.yelp.com/developers/documentation/v3/authentication) to get your private API Key.
 
 ```
 YELP_APIKEY=<YOUR_YELP_API_KEY>
 ```
 
#### Build the app

Run the following command to create the build folder
```
$ npm run build
```

#### Start the app
Run the following command to start the server
```
$ npm start
```

Open <http://localhost:3000/> to see the app.
