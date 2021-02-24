$(document).ready(function() {

  // Hide scroll up button on page load
  $('#scroll-up').hide();

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

  // Allow button to disappear appear on scroll
  $(document).scroll(function(e) {
    const y = $(this).scrollTop();
    if (y > 200) {
      $('#scroll-up').show();
    } else {
      $('#scroll-up').hide();
    }
  });

  // Bring user back to the top on click of the button
  $('#scroll-up').click(function(e) {
    e.preventDefault();
    $("html, body").animate({
      scrollTop: 0
    }, 'fast');
  });
  
});
