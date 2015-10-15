var currentPage = "AboutMe.html";
var loading = false;

// NEEDS TO BE RE-WRITTEN FOR MULTIPLE FOREGROUND WINDOWS

$(document).ready(function () {
    //Fade in homepage
    document.getElementById("navbar").setAttribute("style", "opacity:0");
    $("#navbar").animate({ "opacity": "1" }, 1000);
    document.getElementById("navbar-content").setAttribute("style", "height:364px");
    setTimeout(function () { $(".page-content").animate({ "opacity": "1" }, 800); }, 2000);
	setTimeout(function () { $("#homepage-loading-animation").remove(); },2000);
});

function displayDialog(title, description, buttonArray, functionArray) {
    document.body.innerHTML += "<div class='dialog-blackout'><div class='content-block dialog-window'><div class='dialog-info'><div class='dialog-title'>" + title + "</div>" + description + "</div><ul></ul></div></div>";
    for (var i = 0; i < buttonArray.length; i++) {
        document.querySelector('.dialog-window ul').innerHTML += "<li onclick='"+functionArray[i]+"' class='dialog-button'>"+buttonArray[i]+"</li>";
    }
    $('.dialog-blackout').animate({"opacity":"1"},200);
}

function closeDialog(elem) {
    var element = elem;
    $('.dialog-blackout').animate({ "opacity": "0" }, 200, function() { $(element).parent().parent().parent().remove(); });
}

function loadPage(pageName, element) {
    if (pageName !== currentPage && !loading) {
        //Fade current page and display loading screen
        loading = true;
        $(".page-inner-content").css("opacity", "0.2");
        $(".page-content").append("<div class='loading-animation' style='display:none;'><div class='spinner-1'><div class='top-left-corner'><div class='top-left-inner-corner'></div></div><div class='top-right-corner'><div class='top-right-inner-corner'></div></div><div class='bottom-left-corner'><div class='bottom-left-inner-corner'></div></div><div class='bottom-right-corner'><div class='bottom-right-inner-corner'></div></div></div><div class='spinner-2'></div><svg class='spinner-3'><circle cx='20' cy='20' r='18' /></svg></div>");
        $(".loading-animation").fadeIn(500);
        //Start loading new page
        $.ajax(window.location.pathname + "/" + pageName)
            .done(function (data) {
                //Set current page to new page and do creation/animation/deletion
                currentPage = pageName;
                $(".loading-animation").remove();
                $(".page-inner-content").addClass("old");
                $(".page-content").append("<div style='display:none;' class='page-inner-content new'>" + data + "</div>");
                $(".page-content").height($(".page-content").height());
                $(".old").fadeOut(500);
                $(".new").fadeIn(500);
                $(".page-content").stop().animate({ "height": $(".new").height() + document.querySelector(".page-content").style.marginBottom + document.querySelector(".page-content").style.marginTop }, 500,'swing',function() { $(".page-content").removeAttr('style'); });
                $(".old").remove();
                loading = false;
                $(".new").removeClass("new");
				$("#navbar-content .active").removeAttr("class");
				$(element).addClass("active");
                /*$("body").css("overflow", "hidden");
                $(".page-content").addClass("old");
                $(".page").append("<div class='loaded-animation-layer'><div style='margin:0px 0px 0px 2000px; opacity:0' class='page-content content-block new'><div class='top-left-corner'><div class='top-left-inner-corner'></div></div><div class='top-right-corner'><div class='top-right-inner-corner'></div></div><div class='bottom-left-corner'><div class='bottom-left-inner-corner'></div></div><div class='bottom-right-corner'><div class='bottom-right-inner-corner'></div></div><div class='page-inner-content'>" + data + "</div></div>");
                $(".old div:not(.page-inner-content)").animate({ "opacity": "0" }, { duration: 500, queue: false });
                $(".old").animate({ "margin": "500px 0px 0px 0px", "opacity": "0" }, { duration: 1000, queue: false }, "easeInOutQuint");
                $(".new").animate({ "margin": "0px 0px 0px 328px" }, { duration: 1000, queue: false }, "easeInQuart");
                $(".new").animate({ "opacity": "1" }, { duration: 1000, queue: false }, "easeInQuart");
                setTimeout(function () {
                    $(".old").remove();
                    $(".new").appendTo(".page").removeAttr("style");
                    document.body.removeAttribute("style");
                    $(".loaded-animation-layer").remove();
                    $(".new").removeClass("new");
                    loading = false;
                }, 1500);*/
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                //Display error and remove animation
                displayDialog("ERROR","There was an error loading the requested page: " + errorThrown,["OK"],["closeDialog(this)"] );
                //alert("There was an error loading the request page");
                $(".loading-animation").fadeOut(500, function () { $(this).remove(); });
                $(".page-inner-content").css("opacity", "1");
                loading = false;
            });
    }
}

function loadPageInPage(pageName) {
    if (pageName !== currentPage && !loading) {
        //Fade current page and display loading screen
        loading = true;
        $(".page-inner-content").css("opacity", "0.2");
        $(".page-content").append("<div class='loading-animation' style='display:none;'><div class='spinner-1'><div class='top-left-corner'><div class='top-left-inner-corner'></div></div><div class='top-right-corner'><div class='top-right-inner-corner'></div></div><div class='bottom-left-corner'><div class='bottom-left-inner-corner'></div></div><div class='bottom-right-corner'><div class='bottom-right-inner-corner'></div></div></div><div class='spinner-2'></div><svg class='spinner-3'><circle cx='20' cy='20' r='18' /></svg></div>");
        $(".loading-animation").fadeIn(500);
        //Start loading new page
        $.ajax(pageName)
            .done(function (data) {
                //Set current page to new page and do creation/animation/deletion
                currentPage = pageName;
                $(".page-inner-content").css("opacity", "0");
                $(".loading-animation").fadeOut(500, function () { $(".page-inner-content").html(data); $(".page-inner-content").css("opacity", "1"); $(this).remove(); });
                loading = false;
            })
            .fail(function () {
                //Display error and remove animation
                alert("There was an error loading the request page");
                $(".loading-animation").fadeOut(500, function () { $(this).remove(); });
                $(".page-inner-content").css("opacity", "1");
                loading = false;
            });
    }
}


