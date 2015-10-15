var windowMaximized = false;
var windowInBackground = false;
var backgroundCreation;

function openCreationWindow(creationName,Minimize,Maximize,Background,element){
	if (loading === false && backgroundCreation !== window.location.pathname + "Creations/" + creationName + "/index.html") {
        loading = true;
        firstLoad = true;
        var rect = element.children[1].getBoundingClientRect();
        $(".page-content").append("<div class='loading-animation' style='display:none;'><div class='spinner-1'><div class='top-left-corner'><div class='top-left-inner-corner'></div></div><div class='top-right-corner'><div class='top-right-inner-corner'></div></div><div class='bottom-left-corner'><div class='bottom-left-inner-corner'></div></div><div class='bottom-right-corner'><div class='bottom-right-inner-corner'></div></div></div><div class='spinner-2'></div><svg class='spinner-3'><circle cx='20' cy='20' r='18' /></svg></div>");
        $(".page-inner-content").css("opacity", "0.2");
        $(".loading-animation").css({"display":"block"});
        document.body.innerHTML += "<div style='pointer-events:none;' class='dialog-blackout'><div style='position:absolute;left:" + rect.left + "px;top:" + rect.top + "px;height:"+element.clientHeight+"px;width:"+element.clientWidth+"px' class='foreground-window'><iframe onerror='creationWindowEvent(" + '"error"' + ")' onload='creationWindowEvent(" + '"loaded"' + ")' class='creation-frame' src='" + window.location.pathname + "Creations/" + creationName + "/index.html'></iframe><div class='window-control-panel'><div onclick='closeWindow(this)' class='window-control-button foreground-window-close'>X</div></div></div></div>";
    	if(Background === true){
    		$(".foreground-window .window-control-panel").prepend("<div onclick='sendWindowToBackground(this)' class='window-control-button window-send-to-background'><svg viewbox='-3,-3,55,55' height='50px' width='50px' fill='none' stroke='#fff'><path d='m18 31.7 l-6 0 l0 -20 l18 0 l0 6 m-12 0 l18 0 l0 20 l-18 0 l0 -20' /></svg></div><div onclick='sendWindowToForeground(this)' style='display:none;' class='window-control-button window-send-to-foreground'><svg viewbox='-3,-3,55,55' height='50px' width='50px' fill='none' stroke='#fff'><path d='m18 31.7 l-6 0 l0 -20 l18 0 l0 6 m-12 0 l18 0 l0 20 l-18 0 l0 -20' /></svg></div>");
    	}
    	if(Maximize === true){
    		$(".foreground-window .window-control-panel").prepend("<div onclick='maximizeWindow(this)' class='window-control-button window-maximize'><svg viewbox='-3,-3,55,55' height='50px' width='50px' fill='none' stroke='#fff'><rect x='12.5' y='12' width='25' height='25'></rect></svg></div>");
    	}
    	if(Minimize === true){
    		$(".foreground-window .window-control-panel").prepend("<div class='window-control-button window-minimize'>_</div>");
    	}
    }else if(backgroundCreation === window.location.pathname + "Creations/" + creationName + "/index.html"){
    	sendWindowToForeground($(".background-window .window-send-to-foreground"));
    }
}

function creationWindowEvent(event) {
    if (firstLoad === true) {
        firstLoad = false;
        $(".loading-animation").stop().fadeOut(500, function () { $(this).remove(); });
        if (event === 'loaded') {
            $(".foreground-window").removeAttr('style');
            $(".dialog-blackout").removeAttr('style').animate({ "opacity": "1" }, 200);
        } else if (event === 'error') {
            $(".dialog-blackout").remove();
            displayDialog("ERROR", "There was an error loading the requested page ", ["OK"], ["closeDialog(this)"]);
        }
    }
    $(".page-inner-content").removeAttr('style');
    loading = false;
}

function closeWindow(button) {
	if($(button).parent().parent().parent().hasClass("dialog-blackout")){
	    $(button).parent().parent().parent().animate({"opacity":"0"},200,"swing",function() {
	        $(button).parent().parent().parent().remove();
	        windowMaximized = false;
	    });
	}else{
		$(button).parent().parent().animate({"opacity":"0"},200,"swing",function() {
	        $(button).parent().parent().remove();
	        windowInBackground = false;
	    });
	}
}

function sendWindowToBackground(button){
	if(windowInBackground === false){
		$(button).parent().parent().css("top","-100%");
		backgroundCreation = $(button).parent().parent().children("iframe").attr("src");
		setTimeout(function(){
			    $(button).parent().parent().parent().animate({"opacity":"0"},200,"swing",function() {
			    	var creationBg = $(button).parent().parent().parent()
					$("#background").append("<div style='top:-100%' onmouseenter='backgroundRollover("+'"entering"'+")' onmouseleave='backgroundRollover("+'"leaving"'+")' class='background-window'></div>");
			        $(button).parent().parent().children(".creation-frame").detach().appendTo(".background-window");
			        $(button).parent().parent().children(".window-control-panel").detach().appendTo(".background-window");
			        $(button).parent().children(".window-send-to-foreground").removeAttr("style");
			        $(button).parent().children(".window-send-to-background").css("display","none");
			        $(".background-window").animate({"top":"0%"},500);
			        $(creationBg).remove();
			    });
		});
		windowInBackground = true;
		windowMaximized = false;
	}
	backgroundRollover("leaving");
}

function sendWindowToForeground(button){
	$(button).parent().parent().css("top","-100%");
	setTimeout(function(){
		    $(button).parent().parent().animate({"opacity":"0"},200,"swing",function() {
		    	var creationBg = $(button).parent().parent();
				$(document.body).append("<div class='dialog-blackout'><div style='top:-100%;' class='foreground-window'></div></div>");
		        $(button).parent().parent().children(".creation-frame").detach().appendTo(".foreground-window");
		        $(button).parent().parent().children(".window-control-panel").detach().appendTo(".foreground-window");
		       	$(button).parent().children(".window-send-to-background").removeAttr("style");
			    $(button).parent().children(".window-send-to-foreground").css("display","none");
		        $(".dialog-blackout").animate({ "opacity": "1" }, 200);
		        $(".foreground-window").animate({"top":"10%"},500);
		        $(creationBg).remove();
		    });
	});
	windowInBackground = false;
	backgroundCreation = '';
}

function maximizeWindow(button){
	if(windowMaximized === false){
		$(button).parent().parent().css({"height":"100%","width":"100%","left":"0%","top":"0%"});
		windowMaximized = true;
	}else{
		$(button).parent().parent().css({"height":"80%","width":"80%","left":"10%","top":"10%"});
		windowMaximized = false;
	}
}

function minimizeWindow(button){

}

function backgroundRollover(state){
	if(state === 'entering'){
		$(".background-window").css({"filter":"blur(0px) brightness(1)","-webkit-filter":"blur(0px) brightness(1)"});
	}else{
		$(".background-window").css({"filter":"blur(25px) brightness(0.5)","-webkit-filter":"blur(25px) brightness(0.5)"});
	}
}