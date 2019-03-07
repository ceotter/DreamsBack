// going to build out a simple server and
// respond to / with index.html

// express builds our server framework
const express = require('express');

// path for resolving absolute paths
const path = require('path');

// mongoose the ODM that connects to mongodb
const mongoose = require('mongoose');

// Local variables for database
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/dreams';
const port = process.env.PORT || 3000;

// build an instance of our app:
const app = express();

// add CORS and tell our app to use it:
const cors = require('cors')
app.use(cors());

// connect to your database on localhost through the URI
// now we have our URI, what do we need to pass it here -->
mongoose.connect(dbURI, {useNewUrlParser: true});

function onDBConnected(){
  console.log('we are connected to mongo db')
}
const db = mongoose.connection;
// <-- like right here, yay!

// Attach an Error handler in case of a connection error:
db.on('error', console.error.bind(console, 'connection error:'))

// Confirm connection when connected:
db.once('open', onDBConnected)

// Make a test route that sends back json and status 200 -->
// Test route yay!  which takes in req and res
app.get('/test', function(req, res){
  // it should respond with a status of 200
  // res is the response object
  // it has a method on it called status
  res.status(200);
  // it also has a method on it called json
  // which returns a JSON object -> {"somekey": "some value"}
  res.json({'message': 'worked!'})
  // data.message = "worked!"
})
// <--  here

// Tell our app to listen for calls
app.listen(port, function(){
  console.log('we are running on ' + port)
});
