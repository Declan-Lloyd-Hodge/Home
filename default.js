function ShowHideBanner(){
  if($('#header').css('top') === '-100px'){
    $('#header').css('top','0px');
  }else{
    $('#header').css('top','-100px');
  }
}
