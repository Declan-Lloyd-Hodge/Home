$(document).ready(function(){
  $('#banner-show-button').children('svg').each(function(){
    $(this).children('path').click(function(){
      if($('#header').css('top') === '-100px'){
        $('#header').css('top','0px');
      }else{
        $('#header').css('top','-100px');
      }
    });
  });
});
