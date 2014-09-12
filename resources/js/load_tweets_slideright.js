var tweets = [];

$(document).ready(function() {
    $.ajax({
        url: "/fetch/" + current_id

    }).done(function(data) {
        console.log(data);
        tweets = data;
        nextTweet($(".block"));  // fill .block divs with new tweet content
    });

    function showTweetSequence(){
        var $block = $(".block");
        $block.css({
            top: 0,
            left: 0
        });

        $block.animate({left:'50%'}, 7000, function() {
            $block.fadeOut(1000, function() {
             $block.fadeIn(0, function() {
                    nextTweet($block);
                    showTweetSequence();
             });
            });
        });
    }
    showTweetSequence();
});


// Sets the color of the given element based on its popularity
function setColorGradient($element, popularity) {
    var saturation = popularity*20 + "%";
    console.log(saturation);
    $element.css('background-color', 'hsl(0,' + saturation + ',50%)');
}

// Loads the next tweet into the specified element or returns it
// if it is not specified
function nextTweet(element) {
    var result = tweets.pop();
    if (tweets.length == 0) {
        _iterateTweets();
    }

    if (element == undefined) {
        return result;
    } else {
	console.log(result.favorite_count);
	console.log(result.retweet_count);
        element.find(".profile_pic").attr("src", result.profile_image_url);
        element.find(".username").text("@" + result.screen_name);
        element.find(".date").text(result.created_at);
        element.find(".tweet .text").text(result.text);
        element.find(".favorites").text(result.favorite_count + " favorites");
        element.find(".retweets").text(result.retweet_count + " retweets");

	var popularity = result.favorite_count + result.retweet_count;
	setColorGradient(element, popularity);
    }

}

// Internal function that iterates to the next set of tweets
function _iterateTweets() {
    $.ajax({
        url: "/fetch/" + current_id


    }).done(function(data) {
        tweets = data;
    });
}
