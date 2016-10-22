/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Test / driver code (temporary). Eventually will get this from the server.
$(function () {

  //toggle
  $( ".compose" ).click(function() {
    $( ".new-tweet" ).slideToggle( "slow", function() {
      // Animation complete.
      $(".textsection").select()
    });
  });


  function renderTweets(tweetData) {
    let reverse = tweetData.reverse();
      reverse.forEach((id) => {

        let box = createTweetElement(id);

        let daysAgo = Math.floor(($.now() - id.created_at) / 86400000);
        $(box).find('.username').text(id.user.name);
        $(box).find('.time').text(daysAgo + " days ago");
        $(box).find('.profile').attr('src', id.user.avatars.small);
        $(box).find('.username').text(id.user.name);
        $(box).find('.handler').text(id.user.handle);
        $(box).find('.content').text(id.content.text);
    })
  }

  function createTweetElement(tweet) {
    var html = $("<article class='tweet'>"
       +
            "<header id='header'>"
            +
              "<div>"
              +
              "<img class='profile' src='' alt=''>"
              +
              "</div>"
              +
              "<p class='username'> </p>"
              +
              "<span class='handler'></span>"
              +
            "</header>"
            +
            "<div class='tweetbody'>"
            +
              "<p class='content'></p>"
              +
            "</div>"
            +
            "<footer>"
            +
              "<span class='time'></span>"
              +
              "<div class='buttons'>"
              +
                "<span><img  src=''></span>"
                +
                "<span><img  src=''></span>"
                +
                "<span><img  src=''></span>"
                +
              "</div>"
              +
            "</footer>"
            +
          "</article>");


    var $tweet = $(".tweetbox").append(html);
  return html;
};

//This is the loadTweets function
  function loadTweets(cb) {
   $.ajax({
     url: '/tweets',
     method: 'GET',
     dataType: 'json',
     success: function (tweets) {
       console.log(tweets)
         $(".tweetbox").empty()
         $(".textsection").val('')
         $(".counter").text('140')
          renderTweets(tweets);
     }
   });
  }

// This is the form ajax call
  $('form').submit(function(event) {
   event.preventDefault();
   var req = $(this).serialize();
   $.ajax({
     url: '/tweets',
     method: 'POST',
     data: req,
     success: function (data) {
       console.log(req);
      loadTweets(data);
    },
     error: function (data) {
       $('.counter').text('null')
       $('.counter').css('color', 'tomato')
     }
   })
  });
  // This function loads the tweets when you refresh the page
  loadTweets();

})
