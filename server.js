// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require("body-parser");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));
const port = 8000;

//Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
  console.log(`server is running on localhost: ${port}`);
}

//GET route that returns the projectData object
app.get("/all", function(request, response) {
  response.send(projectData);
});

// POST route
app.post("/addWeather", function(request, response) {
  projectData.temperature = request.body.temperature;
  projectData.date = request.body.date;
  projectData.feel = request.body.feel;
  response.send(projectData);
  console.log(projectData);
});
