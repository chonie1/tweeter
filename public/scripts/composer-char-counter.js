$(document).ready(function() {

  // Function keeps track of how many characters have been inputted in the text area
  $("#tweet-text").on('input', function() {
    const lettersLeft = 140 - $(this).val().length;
    const counter = $(this).parent().find('.counter');
    $(counter).text(lettersLeft);
    
    if (lettersLeft < 0) {
      $(counter).css('color', 'red');
    } else {
      $(counter).css('color', 'black');
    }
  });


});