var selected;

$(document).ready(function(){
  $('.style').each(function(){
    $(this).click(function(){
      $('.style').each(function(){
        $(this).css('background','');
      });
      $(this).css('background','#09f');
      selected = $(this).children('h3').text().toLowerCase() + '.html';
    });
  });
  $('#go-button').click(function(){
    if(selected){
      location.replace('http://declan-lloyd-hodge.github.io/CV/' + selected);
    }else{
      $('#overlay, #error').fadeIn(200);
    }
  });
  $('#ok-button').click(function(){
    $('#overlay, #error').fadeOut(200);
  });
});
