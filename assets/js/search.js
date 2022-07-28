const searchContentEl = $("#generate-content");

var queryURL = window.sessionStorage.getItem("inputURL");
queryURL = JSON.parse(queryURL);

function getLibraryAPI(inputLink) {
    fetch(inputLink)
    .then(function(response) {
        return response.json();
    }).then(function(data) {
        loadResults(data.results);
    })
}

getLibraryAPI(queryURL);
// load out information to page, titles, dates, subjects,descriptions, and links
function loadResults(results) {
    for(var i = 0; i < results.length; i++){
        var cardEl = $("<div class='card p-3 m-3'>");
        
        var cardTitleEl = $("<h2>");
        cardTitleEl.text(results[i].city);
        cardTitleEl.appendTo(cardEl);
        
        var cardDateEl = $("<p>");
        cardDateEl.text(results[i].date);
        cardDateEl.appendTo(cardEl);

        var cardSubjectEl = $("<p>");
        if (results[i].subject){
            console.log("SUBJECT IS TRUTHY")
            cardSubjectEl.text(results[i].subject.join(', '));
        }
        cardSubjectEl.appendTo(cardEl);

        var cardDescriptionEl = $("<p>");
        if (typeof results[i].description === "undefined") {
            console.log("Typeof is: " + typeof results[i].description);
            // cardDescriptionEl.text(results[i].description);
        } else {
            console.log("Typeof is: " + typeof results[i].description);
            cardDescriptionEl.text(results[i].description[0]);
        }
        cardDescriptionEl.appendTo(cardEl);

        var cardUrlEl = $("<a style='max-width: fit-content' class='btn btn-primary'>");
        cardUrlEl.text('Read more');
        cardUrlEl.attr('href',results[i].url)
        cardUrlEl.appendTo(cardEl);

        cardEl.appendTo(searchContentEl);
        
        console.log(results[i].title);
        console.log(results[i].date);
        console.log(results[i].subject); // An array
        console.log(results[i].description); // Also an array
        console.log(results[i].url);
        console.log("-------------------------------------------");
    }
}

//for new input
var inputForm = $("#search-form");
var selectBox = $("#select-box");
var searchInput = $("#search-input");

// Gets input from both the search diag box and options dropdown
function submitSearchQuery(event) {
    event.preventDefault();
    sessionStorage.clear('inputUrl');
    buildURL(searchInput.val(), selectBox.val());
}

// Builds URL with the user input provided from the submitSearchQuery function
function buildURL (search, format) {
    var tempLink = "https://www.loc.gov/" + format + "/?q=" + search + "&fo=json";
    console.log(tempLink);
    sendToHTML(tempLink);
}

// sends a HTML URL to our local storage so we can use on the second page
function sendToHTML(url) {
    window.sessionStorage.setItem("inputURL", JSON.stringify(url));
    window.document.location.href = "./search.html";
}

$('#search-form').on('submit',submitSearchQuery);
console.log(queryURL);