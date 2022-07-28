

// Function to get user input from a text field
// parse that information to link into our API function
// generate content based on the retrieved JSON

// Formatting for input:
// https://www.loc.gov/search/?q= USERINPUT &fo=json
// https://www.loc.gov/manuscript/?q= USER\INPUT &fo=json

var inputForm = $("#search-form");
var selectBox = $("#select-box");
var searchInput = $("#search-input");

// Gets input from both the search diag box and options dropdown
function submitSearchQuery(event) {
    event.preventDefault();
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

// Initiate listener
$('#search-form').on('submit',submitSearchQuery);