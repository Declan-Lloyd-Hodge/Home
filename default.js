function ShowHideBanner(){
  if($('#header').css('top') === '-100px'){
    $('#header').css('top','0px');
  }else{
    $('#header').css('top','-100px');
  }
}

$(document).ready(function(){
  var split = window.location.search.replace('?', '').split('&').map(function(val){
    return val.split('=');
  });
  
  $('#phone').html(split[0][1]);
  $('#email').html(split[1][1]);
  $('#address').html(split[2][1]);
});
