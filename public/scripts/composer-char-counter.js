$(document).ready(function() {

  // Function keeps track of how many characters have been inputted in the text area
  $("#tweet-text").on('input', function() {
    let lettersLeft = 140 - $(this).val().length;
    const counter = $(this).siblings().children()[1];
    $(counter).text(lettersLeft);
    
    if (lettersLeft < 0) {
      $(counter).css('color', 'red');
    }
  });


});