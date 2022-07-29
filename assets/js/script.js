// local storage
// use api to use for search buttons
// call it once for city and once for venue
// if they search by city then we might need geo location?
// add .moment so time can meet location person is at


// 1 when they search for city, use api call to seach city, append to page, possibly add 5 venues to the side

//Grabs the current time and date
var date = moment().format(‘dddd, MMMM Do YYYY’);
var dateTime = moment().format(‘YYYY - MM - DD HH: MM: SS’)

var cityResponse = ('#cityBtn');

var venueResponse = ('#venueBtn');

var venueList = ('.venueList');

var concertSched = ('.concertSched');

var weatherSched = ('.weatherSched');

var searchCity = ('#searchCity');

var searchVenue = ('#searchVenue');

moment();

function ()