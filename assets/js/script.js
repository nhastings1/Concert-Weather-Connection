// local storage
// use api to use for search buttons
// call it once for city and once for venue
// if they search by city then we might need geo location?
// add .moment so time can meet location person is at

// 1 when they search for city, use api call to search city, append to page, possibly add 5 venues to the side

//Grabs the current time and date
var date = moment().format("MMMM Do YYYY");
var dateTime = moment().format("MMMM Do YYYY, h:mm a");

var $cityBtn = $("#cityBtn");

var $venueBtn = $("#venueBtn");

var venueList = $(".venueList");

var concertSched = $(".concertSched");

var weatherSched = $(".weatherSched");

var $searchCity = $("#searchCity");

var $searchVenue = $("#searchVenue");

moment();

$venueBtn.on("click", function (event) {
  event.preventDefault();
  console.log($(this));
  var venue = $searchVenue.val().trim();
    console.log(venue);
  var queryURL =
    "https://api.seatgeek.com/2/events?client_id=MjgxMTM0Nzd8MTY1OTA2NDcyMC44ODExNTg4&q="  + venue;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});

$cityBtn.on("click", function (event) {
  event.preventDefault();
  console.log($(this));
  var city = $searchCity.val().trim();
  console.log(city);
  var queryURLTwo = "https://api.seatgeek.com/2/events?client_id=MjgxMTM0Nzd8MTY1OTA2NDcyMC44ODExNTg4&q="  + city;

  $.ajax({
    url: queryURLTwo,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
});
