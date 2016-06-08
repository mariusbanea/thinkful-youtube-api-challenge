$(document).ready(function () {

    // STEP 1 - get the input from the user
    $("#search-form").submit(function (event) {
        event.preventDefault();
        getResults($("#query").val());
    });

    // STEP 2 - using the input from the user (query) make the API call to get the JSON response
    function getResults(query) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet", //youtibe API special parameter (please check documentation here https://developers.google.com/youtube/)
                maxResults: 20, //number of results per page
                key: "AIzaSyCclIq-RF7zhCJ_JnoXJBLdGvz-v2nzCB0",
                q: query, //shearch query from the user
                type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
            },
            function (data) {
                //show the json array received from the API call
                console.log(data);
                // If there are no results it will just empty the list
                if (data.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                //if there are results, call the displaySearchResults
                displaySearchResults(data.items);
            }
        );
    }

    // STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON
    function displaySearchResults(videos) {

        var buildTheHtmlOutput = "";

        $.each(videos, function (index, video) {
            //concatenate the results inside the HTML variable
            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<p>" + video.snippet.title + "</p>"; //output vide title
            buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + video.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
            buildTheHtmlOutput += "<img src='" + video.snippet.thumbnails.high.url + "'/>"; //display video's thumbnail
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";
        });

        //use the HTML output to show it in the index.html
        $("#search-results ul").html(buildTheHtmlOutput);
    }
});
