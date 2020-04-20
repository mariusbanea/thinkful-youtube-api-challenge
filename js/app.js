'use strict';

// put your own value below!
const apiKey = 'AIzaSyAfvKFqEggXgY2f19t1L5jfDncDCYeNDWY';
const searchURL = 'https://www.googleapis.com/youtube/v3/search';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

// STEP 1 - get the input from the user
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#query').val();
        console.log(searchTerm);
        getYouTubeVideos(searchTerm);
    });
}

// STEP 2 - using the input from the user (query) make the API call to get the JSON response
function getYouTubeVideos(searchTerm) {
    const params = {
        key: apiKey,
        q: searchTerm,
        part: 'snippet',
        maxResults: 10
    };
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;

    console.log(url);

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displaySearchResults(responseJson.items))
        .catch(err => {
            console.log(err);
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
        });
}


// STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON
function displaySearchResults(videosArray) {
    console.log(videosArray);

    $("#search-results ul").html("");

    for (let i = 0; i < videosArray.length; i++) {
        $("#search-results ul").append(
            `<li>
                <p>${videosArray[i].snippet.title}</p>
                <a href='https://www.youtube.com/watch?v=${videosArray[i].id.videoId}' target='_blank'>
                    <img src='${videosArray[i].snippet.thumbnails.high.url}'/>
                </a>
            </li>
        `);
    }

}

$(watchForm);
