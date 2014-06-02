function HideShowSection(input){
  str = $(input).children('h3').html();
  if($(input).parent().children('.content').css('display') === 'none'){
    $(input).parent().children('.content').slideDown();
    $(input).children('h3').html(str.replace("+","-"));
    $(input).parent().css('border-bottom','solid 1px #3af');
  }else{
    $(input).parent().children('.content').slideUp();
    $(input).children('h3').html(str.replace("-","+"));
    $(input).parent().css('border-bottom','solid 0px #3af');
  }
}
