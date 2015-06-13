var selected;

$(document).ready(function(){
  $('.style').each(function(){
    $(this).click(function(){
      $('.style').each(function(){
        $(this).css('background','');
      });
      $(this).css('background','#09f');
      selected = $(this).children('h3').text().toLowerCase() + '.html';
      selected = selected + location.search;
    });
  });
  $('#go-button').click(function(){
    if(selected){
      var url = location.href;
      url = url.replace(url.split("/")[url.split("/").length - 1], '');
      url += selected;
      location.replace(url);
    }else{
      $('#overlay, #error').fadeIn(200);
    }
  });
  $('#ok-button').click(function(){
    $('#overlay, #error').fadeOut(200);
  });
});
