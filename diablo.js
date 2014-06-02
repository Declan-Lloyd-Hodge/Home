function HideShowSection(input){
  str = $(input).children('h3').html();
  if($(input).parent().parent().children('.content').css('display') === 'none'){
    $(input).parent().parent().children('.content').slideDown();
    $(input).children('h3').each(function(){
      $(this).html(str.replace(">+<",">-<"));
    });
    $(input).parent().parent().css({'border-bottom':'solid 1px #f60','box-shadow':'0px 3px 5px -3px #500'});
  }else{
    $(input).parent().parent().children('.content').slideUp();
    $(input).children('h3').each(function(){
      $(this).html(str.replace(">-<",">+<"));
    });
    $(input).parent().parent().css({'border-bottom':'solid 0px #f60','box-shadow':'0px 0px 0px -0px #500'});
  }
}
