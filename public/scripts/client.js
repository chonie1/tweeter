/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // creating a single tweet element
  const createTweetElement = function(tweetData) {
    const daysAgo = Math.floor((Date.now() - tweetData.created_at) / (3600 * 24));
    let dayString = null;

    if (daysAgo >= 365) {
      const years = Math.floor(daysAgo / 365);
      dayString = `${years} years and ${Math.floor(daysAgo % 365)} days ago`;
    } else if (daysAgo === 1) {
      dayString = `${daysAgo} day ago`;
    } else {
      dayString = `${daysAgo} days ago`;
    }

    const $tweet =
    `<article>
      <header>
        <div class="user">
          <img src="${tweetData.user.avatars}">
          <span class="tweet-name">${tweetData.user.name}</span>
        </div>
        <div class="username">${tweetData.user.handle}</div>
      </header>
      <main>
        <p>${tweetData.content.text}</p>
        <hr>
      </main>
      <footer>
        <div>${dayString}</div>
        <div>
          <div class="fas fa-flag icon"></div>
          <div class="fas fa-retweet icon"></div>
          <div class="fas fa-heart icon"></div>
        </div>
      </footer>
     </article>`;
    
    return $tweet;
  };

  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {

    for (const tweet of Object.values(tweets)) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
    return;
  };

  // Ajax request form submission for new tweet
  $('#new-tweet').submit(function(e) {
    e.preventDefault();
    const inputs = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: inputs
    })
      .done(function(msg) {
        console.log(`Success! ${msg}`);
      })
      .fail(function(msg) {
        console.log(`This failed: ${msg}`)
      });

  // Fetching tweets from /tweets route
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets',
      dataType: 'json'
    })
      .done(function(data) {
        renderTweets(data);
      })
      .fail(function(msg) {
        console.log(`This failed: ${msg}`)
      });
  };

    loadTweets();
  });
});