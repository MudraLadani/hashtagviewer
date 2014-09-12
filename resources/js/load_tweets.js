var tweets = [];
var current_tweet = 0;
var tweet_len = 0;

$(document).ready(function() {
    $.ajax({
        url: "/fetch/" + current_id
    }).done(function(data) {
        if (data == "") {
            alert("No tweets found :(");
            return;
        }
        tweets = data;
        tweet_len = data.length - 1;
        tweets = tweets.concat(data);    // To take care of race conditions
        console.log("Initial length = " + tweets.length);
        onNextTweet($(".block"));  // fill .block divs with new tweet content
    });
});

// Loads the next tweet into the specified element or returns it
// if it is not specified
function nextTweet(element) {
    var result = tweets.splice(0, 1)[0];
    current_tweet++;

    console.log("Tweets: " + tweets.length);
    if (current_tweet >= tweet_len && tweets.length <= tweet_len * 2) {
        console.log("Loading more tweets");
        _iterateTweets();
    }

    if (element != undefined) {
        element.find(".profile_pic").attr("src", result.profile_image_url);
        element.find(".username").text("@" + result.screen_name);
        element.find(".date").text(result.created_at);
        element.find(".tweet .text").text(result.text);
        element.find(".favorites").text(result.favorite_count + " favorites");
        element.find(".retweets").text(result.retweet_count + " retweets");
    }

    return result;
}


// Sets the color of the given element based on its popularity
function setColorGradient($element, popularity) {
    var saturation = popularity*20 + "%";
    console.log(saturation);
    $element.css('background-color', 'hsl(0,' + saturation + ',50%)');
}

// Internal function that iterates to the next set of tweets
function _iterateTweets() {
    $.ajax({
        url: "/fetch/" + current_id
    }).done(function(data) {
        tweets = tweets.concat(data);
        current_tweet = 0;
    });
}