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
    "https://api.seatgeek.com/2/events?per_page=5&client_id=MjgxMTM0Nzd8MTY1OTA2NDcyMC44ODExNTg4&q=" + venue;

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

  // Removes form and re-enables scroll bar
  $(".form").remove();
  $("body").css("overflow-y", "visible");
  
  for (var i = 0; i<response.events.length; i++){
    const currentConcertEl = `#concert${i+1}`;
    const currentEvent = response.events[i];
    $(currentConcertEl).append("<h4>Title:</h4>");
    $(currentConcertEl).append(currentEvent.title,);
    $(currentConcertEl).append("<h4>Start Time:</h4>");
    $(currentConcertEl).append(currentEvent.datetime_local);
    $(currentConcertEl).append("<h4>More Info:</h4>");
    $(currentConcertEl).append(`<a href="${currentEvent.url}" target=_blank>SeatGeek Link</a>`);
  }
  });
}); 

// Creates an api call for cities when users search for a city and click the city button
$cityBtn.on("click", function (event) {
  event.preventDefault();
  console.log($(this));
  var city = $searchCity.val().trim();
  console.log(city);
  var queryURLTwo = "https://api.seatgeek.com/2/events?per_page=5&client_id=MjgxMTM0Nzd8MTY1OTA2NDcyMC44ODExNTg4&q=" + city;

  $.ajax({
    url: queryURLTwo,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    // Removes form and re-enables scroll bar
    $(".form").remove();
    $("body").css("overflow-y", "visible");

    // appends first day venues data to first card
  $("#concert1").append("<h4>Title:</h4>");
  $("#concert1").append(response.events[0].title,);
  $("#concert1").append("<h4>Start Time:</h4>");
  $("#concert1").append(response.events[0].datetime_local);
  $("#concert1").append("<h4>Venue:</h4>");
  $("#concert1").append(response.events[0].venue.name_v2);

  // appends second day venues data to second card
  $("#concert2").append("<h4>Title:</h4>");
  $("#concert2").append(response.events[1].title,);
  $("#concert2").append("<h4>Start Time:</h4>");
  $("#concert2").append(response.events[1].datetime_local);
  $("#concert2").append("<h4>Venue:</h4>");
  $("#concert2").append(response.events[1].venue.name_v2);

  // appends third day venues data to third card
  $("#concert3").append("<h4>Title:</h4>");
  $("#concert3").append(response.events[2].title,);
  $("#concert3").append("<h4>Start Time:</h4>");
  $("#concert3").append(response.events[2].datetime_local);
  $("#concert3").append("<h4>Venue:</h4>");
  $("#concert3").append(response.events[2].venue.name_v2);

  // appends fourth day venues data to fourth card
  $("#concert4").append("<h4>Title:</h4>");
  $("#concert4").append(response.events[3].title,);
  $("#concert4").append("<h4>Start Time:</h4>");
  $("#concert4").append(response.events[3].datetime_local);
  $("#concert4").append("<h4>Venue:</h4>");
  $("#concert4").append(response.events[3].venue.name_v2);

  // append fifth day of venues data to fifth card
  $("#concert5").append("<h4>Title:</h4>");
  $("#concert5").append(response.events[4].title,);
  $("#concert5").append("<h4>Start Time:</h4>");
  $("#concert5").append(response.events[4].datetime_local);
  $("#concert5").append("<h4>Venue:</h4>");
  $("#concert5").append(response.events[4].venue.name_v2);
  });
});

//global lattitude and longitude variables
let lat;
let lon;
//UV level colors
let uvLevels = ['green', 'green', 'green', 'gold', 'gold', 'gold', 'orange', 'orange', 'red', 'red', 'red']



//write new name into local storage
let storeSearches = (newCity) => {
    //handle if the new city is already in the history
    if (isHistory) {
        storedCities.unshift(newCity)
    } else { 
        storedCities = [newCity]
        isHistory = true;
    }
    renderHistory();
    localStorage.setItem('cityHistory', JSON.stringify(storedCities))
}

//if there is no data to display
let noData = () => {
    $('#current-weather').append($('<img src="assets/images/clouds.jpg" alt="no data found filler picture">'))   
}

//get UV data
let getUv = () => {
    let urlKey = `https://api.openweathermap.org/data/2.5/uvi?appid=3fe613ce0f5933255968a83d8a700a9f&lat=${lat}&lon=${lon}`
    $.ajax({
        url: urlKey,
        method: 'GET'
    }).then(function (response) {
        $('#current-weather').append($('<div class="cell shrink" id="index-div">').text(`UV Index:`));
        let uvValueDiv = $(`<div class="cell shrink" id="index">`).text(response.value)
        $('#current-weather').append(uvValueDiv);
        //background color based on threat level
        if (Math.floor(response.value) < 11) {
            uvValueDiv.css('background-color', uvLevels[Math.floor(response.value)])
        } else { uvValueDiv.css('background-color', 'purple') }
        uvValueDiv.css('color', 'white')
    })
}

//get 5 day forecast
let getForecast = () => {
    let urlKey = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=3fe613ce0f5933255968a83d8a700a9f&units=imperial`
    $.ajax({
        url: urlKey,
        method: 'GET'
    }).then(function (response) {
            $('#forecast-title').append($('<br>'))
        for (i = 0; i < 5; i++) {
            //cardDiv and cardSection are Foundation elements to make the cards show properly
            let cardDiv = $('<div class="cell large-auto">')
            let card = $('<div class="card forecast">');
            cardDiv.append(card)
            card.append($('<h4 class="h5 card-divider">').text(moment.unix(response.daily[i].dt).format("MM/DD/YYYY")));
            let cardSection = $('<div class="card-section">')
            card.append(cardSection)
            cardSection.append($(`<img src="http://openweathermap.org/img/w/${response.daily[i].weather[0].icon}.png">`));
            cardSection.append($('<p>').text(`Temp: ${response.daily[i].temp.day}\xB0F`));
            cardSection.append($('<p>').text(`Humidity: ${response.daily[i].humidity}%`));
            $('#forecast').append(cardDiv);
        }
    })
}

// get current weather
let getCurrent = (cityName) => {
    let urlKey = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=3fe613ce0f5933255968a83d8a700a9f&units=imperial`
    $.ajax({
        url: urlKey,
        method: 'GET'
    }).then(function (response) {
        //grab latitude and longitude for UV and forecast URLs
        lat = response.coord.lat;
        lon = response.coord.lon;
        //reset field
        $('#current-weather').empty();
        //add title with name and date
        let cityTitle = $('<div class="cell shrink">')
        let cityH2 = $('<h2>').text(`${cityName} (${moment().format('MM')}/${moment().format('DD')}/${moment().format('YYYY')})`);
        cityTitle.append(cityH2)
        $('#current-weather').append(cityTitle);
        //add weather icon
        let icon = $(`<img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png">`);
        $('#current-weather').append(icon);
        //add weather data
        $('#current-weather').append($('<div class="cell">').text(`Temperature: ${response.main.temp} \xB0F`));
        $('#current-weather').append($('<div class="cell">').text(`Humidity: ${response.main.humidity}%`));
        $('#current-weather').append($('<div class="cell">').text(`Wind speed: ${response.wind.speed} MPH`));
        //get UV index
        getUv();
        //get forecast data
        getForecast();    
    })

}


// Listen to search button click
$('#cityBtn').click((event) => {
    event.preventDefault();
    let inputCity = $('#searchCity').val();
    $('#searchCity').val('');
    if (inputCity) {
        $('#current-weather').empty();
        $('#forecast-title').empty();
        $('#forecast').empty();
        noData();
        getCurrent(inputCity);
    }
})

// Listen to search button click
$('#venueBtn').click((event) => {
  event.preventDefault();
  let inputCity = $('#searchVenue').val();
  $('#searchVenue').val('');
  if (inputCity) {
      $('#current-weather').empty();
      $('#forecast-title').empty();
      $('#forecast').empty();
      noData();
      getCurrent(inputCity);
      storeSearches(inputCity);
  }
})






