function fixHeader(){
  $('.nav').addClass('sticky');
  $('.filler').height($('header').height());
  $('.filler').removeClass('hidden');
}
function defixHeader(){
  $('.nav').removeClass('sticky');
  $('.filler').addClass('hidden');
}
function setHeader(){
  var scrolled = $(window).scrollTop();
  var headerHeight = $('header').height() - $('.headerDesktop').height();
  if(scrolled){
    fixHeader();
  }else{
    defixHeader();
  }
}

$(document).ready(function(){
  setHeader();
  $(window).scroll(function() {
    setHeader();
  });
});