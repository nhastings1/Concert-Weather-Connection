//Grabs the current time and date
var date = moment().format("MMMM Do YYYY");
var dateTime = moment().format("MMMM Do YYYY, h:mm a");


// Creates variables for areas and elements on the html page
var $cityBtn = $("#cityBtn");

var $venueBtn = $("#venueBtn");

var eventList = $(".eventList");

var concertSched = $(".concertSched");

var weatherSched = $(".weatherSched");

var $searchCity = $("#searchCity");

var $searchVenue = $("#searchVenue");

var $notAvailable = $("#eventNA");


// Calls the current date
moment();


// Creates an api call for venues when users search for a venue and click the venue button
$venueBtn.on("click", function (event) {
  event.preventDefault();
  console.log($(this));
  var venue = $searchVenue.val().trim();
    console.log(venue);
  var queryURL =
    "https://api.seatgeek.com/2/events?per_page=5&client_id=MjgxMTM0Nzd8MTY1OTA2NDcyMC44ODExNTg4&q="  + venue;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});

// Creates an api call for cities when users search for a city and click the city button
$cityBtn.on("click", function (event) {
  event.preventDefault();
  console.log($(this));
  var city = $searchCity.val().trim();
  console.log(city);
  var queryURLTwo = "https://api.seatgeek.com/2/events?per_page=5&client_id=MjgxMTM0Nzd8MTY1OTA2NDcyMC44ODExNTg4&q="  + city;

  $.ajax({
    url: queryURLTwo,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});



