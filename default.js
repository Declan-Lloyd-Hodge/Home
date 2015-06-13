var currentPage = "AboutMe.html";
var loading = false;

$(document).ready(function () {
    //$("#navbar-content").slideDown(1000, "easeInOutQuart");
    document.getElementById("navbar-content").setAttribute("style", "height:307px;");
    setTimeout(function(){$(".page-content").animate({"opacity":"1"},800, function(){$("#homepage-loading-animation").remove();});},2000);
});

function loadPage(pageName) {
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
                $(".loading-animation").remove();
                $("body").css("overflow", "hidden");
                $(".page-content").addClass("old");
                $(".page").append("<div class='loaded-animation-layer'><div style='margin:0px 0px 0px 2000px; opacity:0' class='page-content content-block new'><div class='top-left-corner'><div class='top-left-inner-corner'></div></div><div class='top-right-corner'><div class='top-right-inner-corner'></div></div><div class='bottom-left-corner'><div class='bottom-left-inner-corner'></div></div><div class='bottom-right-corner'><div class='bottom-right-inner-corner'></div></div><div class='page-inner-content'>" + data + "</div></div>");
                $(".old div:not(.page-inner-content)").animate({ "opacity" : "0" }, {duration:500, queue:false});
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
                }, 1500);
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