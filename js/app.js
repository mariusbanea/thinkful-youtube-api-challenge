$(document).ready(function () {
    // This function is to get the data from youtube API and display it on the page
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

    $("#search-form").submit(function (event) {
        event.preventDefault();
        getResults($("#query").val());
    });
});
