// *** MOBILE MENU *** //
$(function() {
  $('.toggleNav').on('click',function() {
    $('.flex-nav ul').toggleClass('open');
    $('.sticky ul').toggleClass('open');
  });
});