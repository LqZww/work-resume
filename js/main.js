$(function () {
  $('.min').click(function () {
    $(this).toggleClass('min');
    $(this).toggleClass('max');
  });
  $("img.lazyload").lazyload()
});

