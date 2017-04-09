// *** MOBILE MENU *** //
$(function () {
    $('.toggleNav').on('click', function () {
        $('.flex-nav ul').toggleClass('open');
    });
});

// *** SMOOTH SCROLL *** //

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        
        if( $(this).parents('nav').hasClass('flex-nav') ){

          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000);
          return false;

        }else {

          $('html, body').animate({
            scrollTop: (target.offset().top - 50) // 50 is the height of the sticky nav...
          }, 1000);
          return false;

        }
      }
    }
  });
});
