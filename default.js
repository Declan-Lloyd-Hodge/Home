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
  
  if(split[0] && split[0][1]){
    $('#phone').html(split[0][1]);
  }
  if(split[1] && split[1][1]){
    $('#email').html(split[1][1]);
  }
  if(split[2] && split[2][1]){
    $('#address').html(split[2][1].replace('-', ' '));
    $('#address').html($('#address').html().replace('_', '<br/>'));
  }
});
