// Personal API Key for OpenWeatherMap API
const url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiID = "&appid=bcb818a57dcf90246b71fc6db400a3a6";
const country = ",us";
const measure = "&units=imperial";
/* Global Variables */
const button = document.getElementById("generate");
const zip = document.getElementById("zip");
const feelings = document.getElementById("feelings");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// Event listener to add function to existing HTML DOM element
/* Function called by event listener */
button.addEventListener("click", () => {
  getTemperature(url, zip.value, apiID).then(data => {
    postData("http://localhost:8000/addWeather", {
      temperature: data.main.temp,
      date: newDate,
      feel: feelings.value
    }).then(() => {
      updateUI();
    });
  });
});

/* Function to GET Web API Data*/
const getTemperature = async (url, zip, apiID) => {
  const response = await fetch(`${url}${zip}${country}${measure}${apiID}`);
  //console.log(response);
  try {
    const data = await response.json();
    //console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const request = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await request.json();
    //console.log(newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch("http://localhost:8000/all");
  try {
    const allData = await request.json();
    date.innerHTML = `Today's date is ${allData.date}`;
    temp.innerHTML = `Today's temperature is ${allData.temperature}\xB0F`;
    content.innerHTML = `Today I feel ${allData.feel.toUpperCase()}`;
  } catch (error) {
    console.log("error", error);
  }
};
