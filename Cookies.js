function setCookie(cookieName,cookieValue,expiryDays){
  var d = new Date();
  d.setTime(d.getTime() + (expiryDays*24*60*60*1000));
  document.cookie = cookieName + "=" + cookieValue + ";" + "expires" + d.toUTCString();
}

function getCookie(cookieName){
  inputName = cookieName + "=";
  var cookieArray = document.cookie.split(';');

  for(var i = 0; i < cookieArray.length; i++){
    var cookie = cookieArray[i];
    while(cookie.charAt(0)===' '){
      cookie = cookie.substring(1);
    }
    if(cookie.indexOf(inputName) === 0){
      return cookie.substring(inputName.length,cookie.length);
    }
  }
  return "";
}