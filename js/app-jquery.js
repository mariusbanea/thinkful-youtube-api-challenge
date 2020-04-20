$(document).ready(function () {

    // STEP 1 - get the input from the user
    $("#search-form").submit(function (event) {
        //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();
        //get the value from the input box
        var userInput = $("#query").val();
        //use that value to call the getResults function defined bellow
        getResults(userInput);
    });

    // STEP 2 - using the input from the user (query) make the API call to get the JSON response
    function getResults(userSearchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet", //Youtube API special parameter (please check documentation here https://developers.google.com/youtube/v3/docs/search/list)
                maxResults: 20, //number of results per page
                key: "AIzaSyCclIq-RF7zhCJ_JnoXJBLdGvz-v2nzCB0",
                q: userSearchTerm, //shearch query from the user
                type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
            },
            function (receivedApiData) {
                //show the json array received from the API call
                console.log(receivedApiData);
                // if there are no results it will show an error
                if (receivedApiData.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                //if there are results, call the displaySearchResults
                else {
                    displaySearchResults(receivedApiData.items);
                }
            });
    }

    // STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON
    function displaySearchResults(videosArray) {

        //create an empty variable to store one LI for each one the results
        var buildTheHtmlOutput = "";

        $.each(videosArray, function (videosArrayKey, videosArrayValue) {
            //create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>"; //output vide title
            buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
            buildTheHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";
        });

        //use the HTML output to show it in the index.html
        $("#search-results ul").html(buildTheHtmlOutput);
    }
});
