var displayingPreview = false;
var lastStyle;
var digitalImg = "Images/DigitalCV.png";
var digitalDesc = "This style was inspired by <a target='_blank' href='http://www.robertspaceindustries.com'>Robert Space Industries</a> and was designed to have a sci-fi look to it.";
var diabloImg = "Images/DiabloCV.png";
var diabloDesc = "This style was an attempt to recreate the art style of the Diablo game series. I challenged myself to make every look as close as possible to the original art style using just code. Unfortunately this style only really works with Chrome.";
var glassImg = "Images/GlassCV.png";
var glassDesc = "This style was an attempt to make it look like the text was inscribed on some kind of glass tome.";
var firstLoad = true;


function resetCVStyleDefaults() {
    displayingPreview = false;
    lastStyle = "";
}

resetCVStyleDefaults();

function displayCVStylePreview(styleName) {
console.log(displayingPreview);
    if (lastStyle !== styleName) {
        lastStyle = styleName;
        if (displayingPreview === true) {
            $(".page-content").height($(".page-content").height());
            $(".cv-style-preview-description").stop().animate({ "opacity": "0" }, 200, 'swing', function() {
                if (styleName === "digital") {
                    document.querySelector(".cv-style-preview").src = digitalImg;
                    document.querySelector(".cv-style-description").innerHTML = digitalDesc;
                } else if (styleName === "diablo") {
                    document.querySelector(".cv-style-preview").src = diabloImg;
                    document.querySelector(".cv-style-description").innerHTML = diabloDesc;
                } else if (styleName === "glass") {
                    document.querySelector(".cv-style-preview").src = glassImg;
                    document.querySelector(".cv-style-description").innerHTML = glassDesc;
                }
                $(".cv-style-preview-description").stop().animate({ "opacity": "1" }, 200, 'swing', function () { $(".page-content").stop().animate({ "height": $(".page-inner-content").height() + document.querySelector(".page-content").style.marginBottom + document.querySelector(".page-content").style.marginTop }, 500, 'swing', function () { $(".page-content").removeAttr('style'); }); });
            });
        } else {
            if (styleName === "digital") {
                document.querySelector(".cv-style-preview").src = digitalImg;
                document.querySelector(".cv-style-description").innerHTML = digitalDesc;
            } else if (styleName === "diablo") {
                document.querySelector(".cv-style-preview").src = diabloImg;
                document.querySelector(".cv-style-description").innerHTML = diabloDesc;
            } else if (styleName === "glass") {
                document.querySelector(".cv-style-preview").src = glassImg;
                document.querySelector(".cv-style-description").innerHTML = glassDesc;
            }
            $(".cv-style-preview-description").stop().slideDown(500, function(){displayingPreview = true;});
        }
    }
}

function openCVWindow(element, styleName) {
    //$.ajax("/CV/" + styleName + ".html")
    //    .done(function (data) {
    //        document.body.innerHTML += "<div class='foreground-window'>"+data+"<div onclick='closeWindow()' class='foreground-window-close'>X</div></div>";
    //    })
    //    .fail(function (jqXHR, textStatus, errorThrown) {
    //        //Display error and remove animation
    //        displayDialog("ERROR", "There was an error loading the requested page: " + errorThrown, ["OK"], ["closeDialog(this)"]);
    //        //alert("There was an error loading the request page");
    //        $(".loading-animation").fadeOut(500, function () { $(this).remove(); });
    //        $(".page-inner-content").css("opacity", "1");
    //    });
    if (loading === false) {
        loading = true;
        firstLoad = true;
        var rect = element.getBoundingClientRect();
        $(".page-content").append("<div class='loading-animation' style='display:none;'><div class='spinner-1'><div class='top-left-corner'><div class='top-left-inner-corner'></div></div><div class='top-right-corner'><div class='top-right-inner-corner'></div></div><div class='bottom-left-corner'><div class='bottom-left-inner-corner'></div></div><div class='bottom-right-corner'><div class='bottom-right-inner-corner'></div></div></div><div class='spinner-2'></div><svg class='spinner-3'><circle cx='20' cy='20' r='18' /></svg></div>");
        $(".page-inner-content").css("opacity", "0.2");
        $(".loading-animation").fadeIn(500);
        document.body.innerHTML += "<div style='pointer-events:none;' class='dialog-blackout'><div style='position:absolute;left:" + rect.left + "px;top:" + rect.top + "px;height:"+element.clientHeight+"px;width:"+element.clientWidth+"px' class='foreground-window'><iframe onerror='CVWindowEvent(" + '"error"' + ")' onload='CVWindowEvent(" + '"loaded"' + ")' id='CV-frame' src='" + window.location.pathname + "/CV/" + styleName + ".html'></iframe><div class='window-control-panel'><div onclick='closeWindow(this)' class='window-control-button foreground-window-close'>X</div></div></div></div>";
    }
}

function CVWindowEvent(event) {
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