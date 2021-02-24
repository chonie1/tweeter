/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escape function to prevent XSS
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
      <p>${escape(tweetData.content.text)}</p>
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
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
  return;
};

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
      console.log(`This failed: ${msg}`);
    });
};

// Returns error message
const createError = function(msg) {
  const errorHTML =
    `<span class="fas fa-exclamation-triangle"></span>
    <span>${msg}</span>
    <span class="fas fa-exclamation-triangle"></span>`;

  return errorHTML;
};


$(document).ready(function() {
  
  // hiding error message on load
  $('#error').hide();

  // Ajax request form submission for new tweet
  $('#new-tweet').submit(function(e) {
    e.preventDefault();

    // hiding error if there is one already
    $('#error').slideUp();
    
    // validating form
    const counterElem = $(this).find('.counter');
    const counter = Number(counterElem.val());
   
    if (counter < 0) {
      $('#error').html(createError('Chilllllll out. Your tweet is too long'));
      $('#error').slideDown();
      return;
    }

    if (counter === 140) {
      $('#error').html(createError('Did you even try? Type in at least one character'));
      $('#error').slideDown();
      return;
    }

    const inputs = $(this).serialize();

    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: inputs
    })
      .done(function(msg) {
        $('#tweet-text').val('');
        $(counterElem).val(140);
        loadTweets();
      })
      .fail(function(msg) {
        $('#error').html(createError("It's not you it's us. Try restarting the page"));
        $('#error').slideDown();
      });
  });

  // Toggle new tweet handler
  $('#toggle-tweet').click(function(e) {
    e.preventDefault();
    $('#compose-tweet').slideToggle();
    $('#tweet-text').focus();
  });

  loadTweets();
});