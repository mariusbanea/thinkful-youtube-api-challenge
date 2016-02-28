$(document).ready(function () {

    // STEP 1 - get the input from the user
    $("#search-form").submit(function (event) {
        event.preventDefault();
        getResults($("#query").val());
    });

    // STEP 2 - using the input from the user make to API call to get the JSON response
    function getResults(query) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                "part": "snippet",
                "key": "AIzaSyCclIq-RF7zhCJ_JnoXJBLdGvz-v2nzCB0",
                "q": query
            },
            function (data) {
                if (data.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                // If there are no results it will just empty the list
                displaySearchResults(data.items);
            }

        );
    }

    // STEP 3 - using the JSON response, populate the relevant part of your HTML with the variable inside the JSON
    function displaySearchResults(videos) {
        var html = "";
        $.each(videos, function (index, video) {
            // append li to ul
            console.log(video.snippet.thumbnails.medium.url);
            html = html + "<li><p>" + video.snippet.title +
                "</p><img src='" + video.snippet.thumbnails.high.url + "'/></li>";

        });
        $("#search-results ul").html(html);
    }


});
